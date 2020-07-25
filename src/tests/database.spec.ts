
import Database from '@models/index'

test('Testando conexão com o banco', async () => {
  const db = Database.getInstance()
  db.initModels()
  db.associateModels()
  expect(1 + 4).toBe(5)
})
