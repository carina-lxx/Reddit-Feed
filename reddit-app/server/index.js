const express = require ('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('Hello World!')
  })


app.get('/posts/:title', (req, res) => {
    const {title} = req.params
    axios
        .get(`https://www.reddit.com/r/${title}.json`)
        .then(response => {
            let data = response.data.data.children[0].data;
            const { subreddit, title, thumbnail, score, created, url } = data;
            res.status(200).send(
                {
                    name: subreddit,
                    title: title,
                    avatar: thumbnail,
                    score: score,
                    time: created,
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
            let avatar = response.data.data.icon_img;
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