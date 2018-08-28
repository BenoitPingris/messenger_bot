// Load .env file
require('dotenv').config();

// Load express, body parser
const express = require('express');
const bodyParser = require('body-parser');

// Create express instance
const app = express();

app.set('port', (process.env.PORT || 3001));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello I am a bot');
});

app.get('/webhook/', (req, res) => {
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Wrong token');
    }
})

app.listen(app.get('port'), () => console.log(`Listenning on port ${app.get('port')}`));