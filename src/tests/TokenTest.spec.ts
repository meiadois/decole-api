
import AuthService, { TokenInfos } from '@services/AuthService'

test('Testando manipulação do Token', async () => {
  const tokenInfos: TokenInfos = {
    user: {
      id: 1000,
      email: 'guiscunha@gmail.com',
      name: 'testador',
      paid_access: true,
      role: 'admin'
    }
  }
  const encodedToken = await AuthService.generateToken(tokenInfos)
  const decodedToken = await AuthService.decodeToken(encodedToken)

  expect(decodedToken).toMatchObject(tokenInfos)
})
