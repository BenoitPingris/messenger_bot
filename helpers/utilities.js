const request = require('request');
const https = require('https');

module.exports = {
    askTemplate: text => {
        return {
            "attachment":{
                "type":"template",
                "payload":{
                    "template_type":"button",
                    "text": text,
                    "buttons":[
                        {
                            "type":"postback",
                            "title":"Rien",
                            "payload":"NOTHING"
                        },
                        {
                            "type":"postback",
                            "title":"Trouver des excuses",
                            "payload":"EXCUSES"
                        }
                    ]
                }
            }
        }
    },
    callSendAPI: (sender, response, cb = null) => {
        // Construct the message body
        const requestBody = {
            recipient: {
                id: sender
            },
            message: response
        };
        // Send the HTTP request to the Messenger Platform
        request({
            uri: "https://graph.facebook.com/v2.6/me/messages",
            qs: { "access_token": process.env.ACCESS_TOKEN },
            method: "POST",
            json: requestBody
        }, (err, res, body) => {
            if (!err) {
                if (cb) {
                    cb();
                }
            } else {
                console.error("Unable to send message:" + err);
            }
        });
    },
    sendMessage: (sender, text) => {
        let data = { text: text };

        request({
            uri: "https://graph.facebook.com/v2.6/me/messages",
            qs: { "access_token": process.env.ACCESS_TOKEN },
            method: "POST",
            json: {
                recipient: { 'id': sender },
                message: data
            }
        }, (err, res, body) => {
            if (err) {
                console.log('Sending error');
            } else if (res.body.error) {
                console.log('Response body error');
            }
        })
    },
    getUserInfo: psid => {
        return new Promise(resolve => {
            request(`https://graph.facebook.com/${psid}?fields=first_name&access_token=${process.env.ACCESS_TOKEN}`,
                {json: true}, (err, res, body) => {
                    resolve(res['body']);
            });
        });
    }
}