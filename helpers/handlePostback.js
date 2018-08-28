const utilities = require('./utilities');

module.exports = (sender, postback) => {
    const payload = postback.payload;

    switch (payload) {
        case 'GET_STARTED':
            (async function() {
                const result = await utilities.getUserInfo(sender);
                let response = utilities.askTemplate(`Salut ${result['first_name']} :D ! Comment vas-tu ?\nQue veux-tu faire aujourd\'hui ?`);
                utilities.callSendAPI(sender, response);
            })()
            break;
        case 'NOTHING':
            utilities.sendMessage(sender, "Okay pas de soucis !\nÀ bientôt ;)");
            break;
        case 'EXCUSES':
            utilities.sendMessage(sender, "Ah bah non je sais pas faire ça :(");
            break
        default:
            break;
    }
}