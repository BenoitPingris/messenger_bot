const request = require('request');
const utilities = require('./utilities');

module.exports = async (sender, message) => {
    if (message.quick_reply && message.quick_reply.payload) {
        const payload = message.quick_reply.payload;
        switch (payload) {
            case 'NOTHING':
                await utilities.sendMessage(sender, "Okay ! Pas de soucis :D\nÀ bientôt !");
                return;
            case 'FOOD':
                utilities.sendMessage(sender, "Dacodac je t'envoie ça !")
                    .then(() => findItem(sender, 'FOOD')).then(() => {});
                break;
            case 'DRINK':
                utilities.sendMessage(sender, 'Je cherche les meilleurs cocktails attends un peu...')
                    .then(() => findItem(sender, 'DRINK')).then(() => {});
                break;
            default:
                break;
        }
    }
    utilities.sendQuickReplies(sender);
};

const findItem = (sender, type) => {
    url = type === 'FOOD' ? 'https://www.themealdb.com/api/json/v1/1/random.php' : 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    request(url, {json: true}, (err, res, body) => {

        (async function() {
            if (type === 'FOOD') {
                const recipe = body['meals'][0];
                utilities.sendMessage(sender, "Trouvé !")
                    .then(() => utilities.sendMessage(sender, recipe['strMeal']))
                    .then(() => body['strYoutube'] ? utilities.sendMessage(sender, `Voilà une vidéo pour te montrer comment faire: ${body['strYoutube']}`) : 0);
            } else {
                console.log(body);
                const cocktail = body['drinks'][0];
                utilities.sendMessage(sender, "Trouvé !")
                    .then(() => utilities.sendMessage(sender, cocktail['strDrink']))
            }
        })()
    })
};