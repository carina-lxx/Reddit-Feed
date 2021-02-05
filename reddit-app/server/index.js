const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// only one user
let user = {
    id: 1,
    subscribes: [],
    avatars: {},
}
// get all the posts and avatars for one user
app.get('/users/:id/avatars', (req, res) => {
    res.status(200).send(user.avatars);
});

app.get('/users/:id/posts', (req, res) => {
    res.status(200).send(user.subscribes);
});

// fetching one post from reddit api and save it to server
app.post('/users/:id/posts/:title', (req, res) => {
    const { title, id } = req.params;
    axios
        .get(`https://www.reddit.com/r/${title}.json`)
        .then(response => {
            let data = response.data.data.children[0].data;
            const { subreddit, title, score, created, url } = data;
            var seconds = created;
            let timeStamp = new Date(0);
            timeStamp.setSeconds(seconds);

            const months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ];

            const year = timeStamp.getFullYear();
            let month = timeStamp.getMonth();
            month = months[month];
            const day = timeStamp.getDate();
            let hour = timeStamp.getHours();
            let timeOfDay = 'AM';

            if (hour[0] === 0) {
                hour = hour.slice(1);
            }
            if (hour > 11) {
                timeOfDay = 'PM';
                hour = (hour - 12);
            }
            const min = timeStamp.getMinutes();
            let minutes = min.toString();
            if (min < 10) {
                minutes = '0' + min;
            }
            let time = month + ' ' + day + ', ' + year + ' ' + hour + ':' + minutes + ' ' + timeOfDay;

            let newPost = {
                name: subreddit,
                title: title,
                score: score,
                time: time,
                url: url
            }
          
            if (user.id !== undefined) {
                if (user.subscribes.length === 5) {
                    user.subscribes.splice(0, 1);
                    user.subscribes.push(newPost);
                } else {
                    user.subscribes.push(newPost);
                }
                res.status(200).send();
            } else {
                res.status(400).send('You are not logged in / user does not exist')
            }
        })
        .catch(err => {
            res.status(400).send(err)
        })

})

// fetching one avatar of the subreddit from reddit api and save it to server
app.post('/users/:id/avatars/:title', (req, res) => {
    const { title, id } = req.params
    axios
        .get(`https://www.reddit.com/r/${title}/about.json`)
        .then(response => {
            const idx = response.data.data.community_icon.indexOf('?');
            const icon = response.data.data.community_icon.slice(0, idx);
            const avatar = icon || response.data.data.icon_img;
            if (user.id !== undefined) {
                user.avatars[title] = avatar
                res.status(200).send()
            } else {
                res.status(400).send('You are not logged in / user does not exist')
            }

        })
        .catch(err => {
            res.status(400).send(err)
        })
});

app.listen(process.env.PORT || 8080);
