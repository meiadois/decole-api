import * as bcrypt from 'bcrypt'
class LoginService {
  async createHashedPassword (password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
  }

  async login (password: string, input: string): Promise<boolean> {
    return await bcrypt.compare(input, password)
  }
}
export default new LoginService()
