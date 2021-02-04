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


app.get('/posts', (req, res) => {
    const query = req.body;
    axios
        .get(`https://www.reddit.com/r/denver.json`)
        .then(response => {
            let data = response.data.data.children[0].data;
            const { subreddit, title, thumbnail, score, created, url } = data;
            console.log(subreddit, title, thumbnail, score, created, url)
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
            console.log('err at api: ', err)
        })
});


app.listen(process.env.PORT || 8080);