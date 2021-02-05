const express = require ('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let user = {
    id: 1,
    tweets: []
}
app.get('/', (req, res) => {
    res.send('Hello World!')
  })


app.get('/users/:id/posts/:title', (req, res) => {
    const {title, id} = req.params
    axios
        .get(`https://www.reddit.com/r/${title}.json`)
        .then(response => {
            let data = response.data.data.children[0].data;
            const { subreddit, title, score, created, url } = data;
            var seconds = created;
            let timeStamp = new Date(0); 
            timeStamp.setSeconds(seconds);
            // response format is: 2021-01-31T03:07:38.000Z
            
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
            if(hour[0] === 0) {
                hour = hour.slice(1);
            }
            if(hour > 11) {
                timeOfDay = 'PM';
                hour = (hour - 12);
            }
            const min = timeStamp.getMinutes();
            let minutes = min.toString();
            if(min < 10) {
                minutes = '0' + min;
            }
            let time = month + ' ' + day + ', ' + year + ' ' + hour + ':' + minutes + ' ' + timeOfDay;

            res.status(200).send(
                {
                    name: subreddit,
                    title: title,
                    score: score,
                    time: time,
                    url: url
                }  
            )
        })
        .catch(err => {
            res.status(400).send(err)
            // console.log('err at api: ', err)
        })
});

app.get('/avatars/:title', (req, res) => {
    const {title} = req.params
    axios
        .get(`https://www.reddit.com/r/${title}/about.json`)
        .then(response => {
            const idx = response.data.data.community_icon.indexOf('?');
            const icon = response.data.data.community_icon.slice(0, idx);
            const avatar = icon || response.data.data.icon_img;
            res.status(200).send(
                {
                    avatar: avatar,
                }  
            )
        })
        .catch(err => {
            res.status(400).send(err)
            // console.log('err at api: ', err)
        })
});

app.listen(process.env.PORT || 8080);