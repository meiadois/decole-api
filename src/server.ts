import app from './app'
import { sequelize } from './database'

app.listen(3000, () => {
  console.log(`App running at ${3000}`)

  sequelize.authenticate().then(async () => {
    console.log('Database connected')

    try {
      await sequelize.sync({ force: true })
    } catch (err) {
      console.log(err.message)
    }
  }).catch((err: Error) => {
    console.log(err.message)
  })
})

console.log(process.env.APP_ID)
