import app from './app'
require('dotenv/config')
app.listen(Number(process.env.PORT) || 5000)
console.log(`Runing the App on the port : ${Number(process.env.PORT) || 5000}`)
