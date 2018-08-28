const utilities = require('./utilities');

module.exports = async (sender, message) => {
    const result = await utilities.getUserInfo(sender);
};