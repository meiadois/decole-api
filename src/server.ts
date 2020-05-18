import app from './app'
app.listen(Number(process.env.SERVER_PORT) | 3000)
