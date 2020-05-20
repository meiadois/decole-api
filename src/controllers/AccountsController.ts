import { Request, Response, NextFunction } from 'express'
import { Account } from '../models/Account'
import { User } from '../models/User'
import { Channel } from '../models/Channel'

import { ErrorHandler } from '../helpers/ErrorHandler'

class AccountsController {
  async list (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const _account = await Account.findAll({
        include: [
          {
            association: 'user'
          },
          {
            association: 'channel'
          }
        ]
      })
      return res.json(_account)
    } catch (err) {
      next(err)
    }
  }

  async index (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params

      if (!id) {
        throw new ErrorHandler(404, '')
      }
      const _account = await Account.findByPk(id, {
        include: [
          {
            association: 'user'
          },
          {
            association: 'channel'
          }
        ]
      })

      if (_account === null) {
        throw new ErrorHandler(404, `Conta ${id} não encontrada.`)
      }
      return res.status(200).json(_account)
    } catch (err) {
      next(err)
    }
  }

  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { user_id, username, channel_name } = req.body
      if (!user_id || !username || !channel_name) {
        throw new ErrorHandler(400, '')
      }

      const _channel = await Channel.findOne({
        where: {
          name: channel_name
        }
      })

      if (!_channel) {
        throw new ErrorHandler(404, `Canal ${channel_name} não encontrada.`)
      }

      const nResults = await Account.count({ where: { user_id, channel_id: _channel.id as number } })

      if (nResults !== 0) {
        throw new ErrorHandler(400, `Já existe uma conta do usuário [${user_id}] no canal ${channel_name}.`)
      }

      const _user = await User.findByPk(user_id)

      if (!_user) {
        throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`)
      }

      const _account = await Account.findOrCreate({
        where: { user_id, username, channel_id: _channel.id as number }
      }).catch((err) => {
        console.log(err)
        return null
      })
      if (!_account) {
        throw new ErrorHandler(500, '')
      }

      return res.status(201).json(_account)
    } catch (err) {
      next(err)
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { user_id, username, channel_name } = req.body
      if (!id || !user_id || !username || !channel_name) {
        throw new ErrorHandler(400, '')
      }

      const _account = await Account.findByPk(id, {
        include: [
          {
            association: 'user'
          },
          {
            association: 'channel'
          }
        ]
      })

      if (_account === null) {
        throw new ErrorHandler(404, `Conta ${id} não encontrada.`)
      }

      const _channel = await Channel.findOne({
        where: {
          name: channel_name
        }
      })

      if (!_channel) {
        throw new ErrorHandler(404, `Canal ${channel_name} não encontrada.`)
      }

      const _user = await User.findByPk(user_id)

      if (!_user) {
        throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`)
      }

      _account.user_id = user_id
      _account.channel_id = _channel.id as number
      _account.username = username

      const _success = await _account.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new ErrorHandler(500, '')
      }
      return res.status(200).json(await _account.reload())
    } catch (err) {
      next(err)
    }
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      if (!id) {
        throw new ErrorHandler(400, '')
      }

      const _account = await Account.findByPk(id)

      if (!_account) {
        throw new ErrorHandler(404, `Conta ${id} não encontrada.`)
      }

      const _success = await _account.destroy().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new ErrorHandler(500, '')
      }
      return res.status(204).json({})
    } catch (err) {
      next(err)
    }
  }

  async meList (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = res.locals.user
      const _account = await Account.findAll({
        where: {
          user_id: id
        },
        include: [
          {
            association: 'channel'
          }
        ]
      })
      return res.json(_account)
    } catch (err) {
      next(err)
    }
  }

  async meIndex (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user_id = res.locals.user.id
      const { channel_name } = req.params
      const _channel = await Channel.findOne({
        where: {
          name: channel_name
        }
      })

      if (!_channel) {
        throw new ErrorHandler(404, `Canal ${channel_name} não encontrada.`)
      }

      const _account = await Account.findOne({
        where: {
          user_id,
          channel_id: _channel.id as number
        },
        include: [
          {
            association: 'channel'
          }
        ]
      })
      return res.json(_account)
    } catch (err) {
      next(err)
    }
  }

  async meStore (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user_id = res.locals.user.id
      const { username, channel_name } = req.body
      if (!user_id || !username || !channel_name) {
        throw new ErrorHandler(400, '')
      }
      const _channel = await Channel.findOne({
        where: {
          name: channel_name
        }
      })
      if (!_channel) {
        throw new ErrorHandler(404, `Canal ${channel_name} não encontrada.`)
      }

      const nResults = await Account.count({ where: { user_id, channel_id: _channel.id as number } })

      if (nResults !== 0) {
        throw new ErrorHandler(400, `Já existe uma conta do usuário [${user_id}] no canal ${channel_name}.`)
      }

      const _user = await User.findByPk(user_id)

      if (!_user) {
        throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`)
      }

      const _account = await Account.findOrCreate({
        where: { user_id, username, channel_id: _channel.id as number }
      }).catch((err) => {
        console.log(err)
        return null
      })
      if (!_account) {
        throw new ErrorHandler(500, '')
      }

      return res.status(201).json(_account)
    } catch (err) {
      next(err)
    }
  }

  async meUpdate (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user_id = res.locals.user.id
      const { channel_name } = req.params
      const { username } = req.body
      if (!user_id || !username || !channel_name) {
        throw new ErrorHandler(400, '')
      }

      const _channel = await Channel.findOne({
        where: {
          name: channel_name
        }
      })

      if (!_channel) {
        throw new ErrorHandler(404, `Canal ${channel_name} não encontrada.`)
      }
      const _account = await Account.findOne({
        where: {
          user_id,
          channel_id: _channel.id as number
        },
        include: [
          {
            association: 'user'
          },
          {
            association: 'channel'
          }
        ]
      })
      if (_account === null) {
        throw new ErrorHandler(404, `Conta do usuário ${user_id} não encontrada.`)
      }
      const _user = await User.findByPk(user_id)

      if (!_user) {
        throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`)
      }

      _account.user_id = user_id
      _account.channel_id = _channel.id as number
      _account.username = username

      const _success = await _account.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new ErrorHandler(500, '')
      }
      return res.status(200).json(await _account.reload())
    } catch (err) {
      next(err)
    }
  }

  async meDelete (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user_id = res.locals.user.id
      const { channel_name } = req.params

      const _channel = await Channel.findOne({
        where: {
          name: channel_name
        }
      })

      if (!_channel) {
        throw new ErrorHandler(404, `Canal ${channel_name} não encontrada.`)
      }

      const _account = await Account.findOne({
        where: {
          user_id,
          channel_id: _channel.id as number
        },
        include: [
          Account.associations.lessons
        ]
      })
      if (!_account) {
        throw new ErrorHandler(404, `Conta do usuário ${user_id} no ${channel_name} não encontrada.`)
      }

      const _success = await _account.destroy().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new ErrorHandler(500, '')
      }
      return res.status(204).json({})
    } catch (err) {
      next(err)
    }
  }
}
export default new AccountsController()
