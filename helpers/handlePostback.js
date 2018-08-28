const utilities = require('./utilities');

module.exports = (sender, postback) => {
    const payload = postback.payload;

    switch (payload) {
        case 'GET_STARTED':
            (async function() {
                const result = await utilities.getUserInfo(sender);
                await utilities.sendMessage(sender, `Salut ${result['first_name']} :D ! Comment vas-tu ?`);
                await utilities.sendMessage(sender, "Que veux-tu faire aujourd\'hui ?");
                utilities.sendQuickReplies(sender);
            })()
            break;
        default:
            break;
    }
}