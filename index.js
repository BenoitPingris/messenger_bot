// Load .env file
require('dotenv').config();

// Load express, body parser
const express = require('express');
const bodyParser = require('body-parser');

const handleMessage = require('./helpers/handleMessage');
const handlePostback = require('./helpers/handlePostback');

// Create express instance
const app = express();

app.set('port', (process.env.PORT || 3001));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello I am a bot');
});

app.get('/webhook/', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
            console.log('Webhook verified!!!');
            res.status(200).send(challenge);
        } else {
            console.log('Error verif');
            res.sendStatus(403);
        }
    }
});

app.post('/webhook/', (req, res) => {
    if (req.body.object === 'page') {
        req.body.entry.forEach(function(entry) {
            // Gets the message and sender ID
            const webhookEvent = entry.messaging[0];
            const sender = webhookEvent.sender.id;

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhookEvent.message) {
                handleMessage(sender, webhookEvent.message);
            } else if (webhookEvent.postback) {
                handlePostback(sender, webhookEvent.postback);
            }
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

app.listen(app.get('port'), () => console.log(`Listenning on port ${app.get('port')}`));