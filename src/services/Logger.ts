import * as Discord from 'discord.js'
const client = new Discord.Client()
const INFO_CHANNEL_ID = String(process.env.DISCORD_INFO_CHANNEL_ID)
const ERROR_CHANNEL_ID = String(process.env.DISCORD_ERROR_CHANNEL_ID)
const WARN_CHANNEL_ID = String(process.env.DISCORD_WARN_CHANNEL_ID)
const DEBUG_CHANNEL_ID = String(process.env.DISCORD_DEBUG_CHANNEL_ID)

let INFO_CHANNEL: any
let ERROR_CHANNEL: any
let WARN_CHANNEL: any
let DEBUG_CHANNEL: any

client.once('ready', () => {
  console.log('Discord Logger Bot is ready!')
  INFO_CHANNEL = client.channels.cache.get(INFO_CHANNEL_ID)
  ERROR_CHANNEL = client.channels.cache.get(ERROR_CHANNEL_ID)
  WARN_CHANNEL = client.channels.cache.get(WARN_CHANNEL_ID)
  DEBUG_CHANNEL = client.channels.cache.get(DEBUG_CHANNEL_ID)
})

client.login(process.env.DISCORD_BOT_LOGGER_TOKEN)
function process_message (message: string): string {
  if (message.length > 2000) {
    message = message.substr(0, 1999)
  }
  return message
}
class Logger {
  async info (message: string, url?: string): Promise<void> {
    if (url === undefined) {
      message = `:information_source:\n[Mensagem] ${message}`
    } else {
      message = `:information_source:\n[URL] ${url}\n[Mensagem] ${message}`
    }
    message = process_message(message)
    INFO_CHANNEL.send(message)
  }

  async debug (message: string, url?: string): Promise<void> {
    if (url === undefined) {
      message = `:mag:\n[Mensagem] ${message}`
    } else {
      message = `:mag:\n[URL] ${url}\n[Mensagem] ${message}`
    }
    message = process_message(message)
    DEBUG_CHANNEL.send(message)
  }

  async error (message: string, url?: string): Promise<void> {
    if (url === undefined) {
      message = `:octagonal_sign: ${message}`
    } else {
      message = `:octagonal_sign:\n[URL] ${url}\n${message}`
    }
    message = process_message(message)

    ERROR_CHANNEL.send(message)
  }

  async warn (message: string, url?: string): Promise<void> {
    if (url === undefined) {
      message = `:warning:\n[Mensagem] ${message}`
    } else {
      message = `:warning:\n[URL] ${url}\n[Mensagem] ${message}`
    }
    message = process_message(message)
    WARN_CHANNEL.send(message)
  }

  get_message_from_error (err: any): string {
    let message = `[Title] ${err.toString()}`
    message += `\n[Stack] ${err.stack}`
    return message
  }
}
export default new Logger()
