import app from './app'
require('dotenv/config')
app.listen(Number(process.env.PORT) | 3000)
