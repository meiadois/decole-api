const Discord = require('discord.js');
const client = new Discord.Client();
const INFO_CHANNEL_ID = process.env.DISCORD_INFO_CHANNEL_ID
const ERROR_CHANNEL_ID = process.env.DISCORD_ERROR_CHANNEL_ID
const WARN_CHANNEL_ID = process.env.DISCORD_WARN_CHANNEL_ID
const DEBUG_CHANNEL_ID = process.env.DISCORD_DEBUG_CHANNEL_ID

var INFO_CHANNEL = null;
var ERROR_CHANNEL = null;
var WARN_CHANNEL = null;
var DEBUG_CHANNEL = null;

client.once('ready', () => {
    console.log('Discord Logger Bot is ready!');
    INFO_CHANNEL = client.channels.cache.get(INFO_CHANNEL_ID);
    ERROR_CHANNEL = client.channels.cache.get(ERROR_CHANNEL_ID);
    WARN_CHANNEL = client.channels.cache.get(WARN_CHANNEL_ID);
    DEBUG_CHANNEL = client.channels.cache.get(DEBUG_CHANNEL_ID);
});

client.login(process.env.DISCORD_BOT_LOGGER_TOKEN);
function process_message(message) {
    if (message.length > 2000) {
        message = message.substr(0, 1999)
    }
    return message;
}
module.exports = {
    async info(message, req = null) {
        message = `:information_source:\n[Mensagem] ${message}`

        if (req !== null) {
            message += `\n[Endpoint] ${req.originalUrl}`
        }
        message = process_message(message);
        INFO_CHANNEL.send(message);
    },
    async debug(message, req) {
        message = `:mag:\n[Mensagem] ${message}`

        if (req !== null) {
            message += `\n[Endpoint] ${req.originalUrl}`
        }
        message = process_message(message);
        DEBUG_CHANNEL.send(message);
    },
    async error(message) {
        message = `:octagonal_sign: ${message}`
        message = process_message(message);

        ERROR_CHANNEL.send(message);
    },
    async warn(message) {
        message = `:warning:\n[Mensagem] ${message}`

        if (req !== null) {
            message += `\n[Endpoint] ${req.originalUrl}`
        }
        message = process_message(message);
        WARN_CHANNEL.send(message);
    },
    get_message_from_error(err) {
        var message = `[Title] ${err.toString()}`
        message += `\n[Stack] ${err.stack}`
        return message
    },
}