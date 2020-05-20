import { Request, Response, NextFunction } from 'express'
import { User } from '../models/User'
import NodeMailer from '../services/NodeMailer'
import { ErrorHandler } from '../helpers/ErrorHandler'
import Logger from '../services/Logger'
import LoginService from '../services/LoginService'
import AuthService from '../services/AuthService'
import { ResetPassword } from '../models/ResetPassword'
import * as crypto from 'crypto'
import * as moment from 'moment-timezone'

function isEmail (email: string): boolean {
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  const re = new RegExp(pattern)
  return re.test(email)
}

class AccountsController {
  async login (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const now = moment()

      const { email, password } = req.body

      if (!isEmail(email)) {
        throw new ErrorHandler(400, `[${email}] não é um email válido.`)
      }

      const _user = await User.findOne({ where: { email } })

      if (_user === null) {
        throw new ErrorHandler(404, `Não há usuários com o email ${email}.`)
      }

      const success = await LoginService.login(_user.password, password)
      if (!success) {
        throw new ErrorHandler(404, 'Email ou Senha incorretos.')
      }

      const token = await AuthService.generateToken({
        user: {
          id: _user.id as number,
          email: _user.email,
          name: _user.name,
          paid_access: (moment(_user.paid_access_expiration).isAfter(now))
        }
      })
      Logger.info(`Usuário ${_user.email} realizou o login com sucesso`)
      return res.status(200).json({
        message: 'Login realizado com sucesso',
        user: {
          email: _user.email,
          name: _user.name,
          introduced: _user.introduced,
          paid_access: (moment(_user.paid_access_expiration).isAfter(now)),
          token
        }

      })
    } catch (err) {
      next(err)
    }
  }

  async register (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const promotion_expiration_date = moment('2020-07-01')
      const now = moment()

      let paid_exp_date = moment()
      if (!now.isAfter(promotion_expiration_date)) {
        console.log('Promotion is valid')
        paid_exp_date = now.add(30, 'days')
      } else {
        console.log('Promotion is not valid')
      }

      let { name, email, password } = req.body
      if (!name || !email || !password) {
        throw new ErrorHandler(400, '')
      }
      if (!isEmail(email)) {
        throw new ErrorHandler(400, `[${email}] não é um email válido.`)
      }
      const nResults = await User.count({ where: { email } })

      if (nResults !== 0) {
        throw new ErrorHandler(400, `Email [${email}] já está sendo utilizado.`)
      }

      password = await LoginService.createHashedPassword(password)

      const _user = await User.create({
        name, email, password, paid_access_expiration: paid_exp_date
      })

      if (!_user) {
        throw new ErrorHandler(500, '')
      }
      await _user.reload()
      _user.password = ''

      const token = await AuthService.generateToken({
        user: {
          id: _user.id as number,
          email: _user.email,
          name: _user.name,
          paid_access: paid_exp_date.isAfter(now)
        }
      })
      Logger.info(`Usuário ${_user.email} cadastrado com sucesso com sucesso`)
      return res.status(200).json({
        message: 'Login realizado com sucesso',
        user: {
          email: _user.email,
          name: _user.name,
          introduced: _user.introduced,
          paid_access: paid_exp_date.isAfter(now),
          token
        }

      })
    } catch (err) {
      next(err)
    }

    // return res.status(201).json(_user);
  }

  async generate_reset_password (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email } = req.body
      if (!isEmail(email)) {
        throw new ErrorHandler(400, `[${email}] não é um email válido.`)
      }
      const user_id = await User.findOne({ where: { email } }).then((user) => user?.id)

      if (user_id == null) {
        console.log('b')
        throw new ErrorHandler(404, `Não há usuários com o email ${email}.`)
      }
      await ResetPassword.destroy({ where: { user_id } })

      const token = crypto.randomBytes(4).toString('hex')
      const expiresAt = moment().add(180, 'seconds')

      const reset_password = await ResetPassword.create({
        user_id,
        token,
        expiresAt
      }).catch((err) => {
        console.log(err)
        return null
      })
      if (!reset_password) {
        throw new ErrorHandler(500, '')
      }
      await NodeMailer.sendMail(email, 'Esqueci minha senha', `O seu token de recuperação é ${token}`)
      Logger.info(`Usuário ${email} recebeu o código de recuperação de senha com sucesso.`)
      return res.json({ token })
    } catch (err) {
      next(err)
    }
  }

  async forgot_password (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { token, password } = req.body
      const now = moment()

      const reset_password = await ResetPassword.findOne({ where: { token } })
      if (reset_password == null) {
        throw new ErrorHandler(404, `Não há reset_passwords com o token ${token}.`)
      }

      if (moment(reset_password.expiresAt) < now) {
        throw new ErrorHandler(400, `O token [${token}] já expirou.`)
      }

      const user = await User.findByPk(reset_password.user_id)

      if (user == null) {
        throw new ErrorHandler(404, `Não há usuários com o id ${reset_password.user_id}.`)
      }

      user.password = await LoginService.createHashedPassword(password)

      const _success = await user.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new ErrorHandler(500, '')
      }

      await ResetPassword.destroy({ where: { user_id: reset_password.user_id } })
      Logger.info(`Senha do usuário ${user.id} alterada com sucesso.`)
      return res.status(200).json()
    } catch (err) {
      next(err)
    }
  }
}
export default new AccountsController()
