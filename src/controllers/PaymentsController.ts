import { Request, Response, NextFunction } from 'express'
import { User } from '@models/User'
import { Payment } from '@models/Payment'
import CustomError from '@utils/CustomError'
import moment from 'moment-timezone'

const PAYMENT_STATUS = ['confirmed', 'pending', 'denied', 'refunded']
function is_valid_payment_status (status: string): boolean {
  return PAYMENT_STATUS.indexOf(status) >= 0
}

const PAYMENT_TYPES = ['access']
function is_valid_payment_type (status: string): boolean {
  return PAYMENT_TYPES.indexOf(status) >= 0
}

class PaymentsController {
  async list (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const _payments = await Payment.findAll()
      res.json(_payments)
    } catch (err) {
      next(err)
    }
  }

  async index (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params

      if (!id) {
        throw new CustomError(404, '')
      }
      const _payment = await Payment.findByPk(id, {
        include: [
          {
            association: 'user'
          }
        ]
      })

      if (_payment === null) {
        throw new CustomError(404, `Pagamento ${id} não encontrado.`)
      }
      return res.status(200).json(_payment)
    } catch (err) {
      next(err)
    }
  }

  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const now = moment()

      const { price, description, value, date, type, status, user_id } = req.body

      if (!price || !description || !value || !date || !type || !status || !user_id) {
        throw new CustomError(400, '')
      }

      const _user = await User.findByPk(user_id)

      if (!_user) {
        throw new CustomError(404, `Usuario ${user_id} não encontrado.`)
      }

      if (status != null) {
        if (!is_valid_payment_status(status)) {
          throw new CustomError(400, `[${status}] não é um status válido. Estes são os status possíveis: [${PAYMENT_STATUS.toString()}]`)
        }
      }
      if (type != null) {
        if (!is_valid_payment_type(type)) {
          throw new CustomError(400, `[${type}] não é um tipo válido. Estes são os status possíveis: [${PAYMENT_TYPES.toString()}]`)
        }
      }
      const _payment = await Payment.create({
        price, description, value, date, type, status, user_id
      }).catch((err) => {
        console.log(err)
        return null
      })
      if (!_payment) {
        throw new CustomError(500, '')
      }

      if (type === 'access') {
        if (_user.paid_access_expiration == null) _user.paid_access_expiration = now.toDate()
        const moment_paid_access_expiration = moment(_user.paid_access_expiration)

        if (moment_paid_access_expiration.isAfter(now)) {
          _user.paid_access_expiration = moment_paid_access_expiration.add((value + 1), 'days').toDate()
        } else {
          _user.paid_access_expiration = now.add((value + 1), 'days').toDate()
        }

        const _success = await _user.save().then(() => {
          return true
        }).catch((err) => {
          console.log(err)
          return false
        })

        if (!_success) {
          throw new CustomError(500, '')
        }
      }

      return res.status(201).json(_payment)
    } catch (err) {
      next(err)
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { price, description, value, date, type, status, user_id } = req.body

      if (!price || !description || !value || !date || !type || !status || !user_id) {
        throw new CustomError(400, '')
      }

      const _user = await User.findByPk(user_id)

      if (!_user) {
        throw new CustomError(404, `Usuario ${user_id} não encontrado.`)
      }

      const _payment = await Payment.findByPk(id)

      if (!_payment) {
        throw new CustomError(404, `Etapa ${id} não encontrada.`)
      }

      _payment.price = price
      _payment.description = description
      _payment.value = value
      _payment.date = date
      _payment.type = type
      _payment.status = status
      _payment.user_id = user_id

      const _success = await _payment.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new CustomError(500, '')
      }
      return res.status(200).json(_payment)
    } catch (err) {
      next(err)
    }
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params

      if (!id) {
        throw new CustomError(400, '')
      }

      const _payment = await Payment.findByPk(id)

      if (!_payment) {
        throw new CustomError(404, `Pagamento ${id} não encontrada.`)
      }

      const _success = await _payment.destroy().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new CustomError(500, '')
      }
      return res.status(204).json({})
    } catch (err) {
      next(err)
    }
  }

  async meList (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user_id = res.locals.user.id
      const _payments = await Payment.findAll({
        where: { user_id }
      })
      res.json(_payments)
    } catch (err) {
      next(err)
    }
  }

  async meIndex (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params

      if (!id) {
        throw new CustomError(404, '')
      }
      const user_id = res.locals.user.id
      const _payment = await Payment.findOne({
        where: { id, user_id },
        include: [
          {
            association: 'user'
          }
        ]
      })

      if (_payment === null) {
        throw new CustomError(404, `Pagamento ${id} do usuário ${user_id} não encontrada.`)
      }
      return res.status(200).json(_payment)
    } catch (err) {
      next(err)
    }
  }

  async meStore (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user_id = res.locals.user.id

      const now = moment()

      const { price, description, value, date, type, status } = req.body

      if (!price || !description || !value || !date || !type || !status || !user_id) {
        throw new CustomError(400, '')
      }

      const _user = await User.findByPk(user_id)

      if (!_user) {
        throw new CustomError(404, `Usuario ${user_id} não encontrado.`)
      }

      if (status != null) {
        if (!is_valid_payment_status(status)) {
          throw new CustomError(400, `[${status}] não é um status válido. Estes são os status possíveis: [${PAYMENT_STATUS.toString()}]`)
        }
      }
      if (type != null) {
        if (!is_valid_payment_type(type)) {
          throw new CustomError(400, `[${type}] não é um tipo válido. Estes são os status possíveis: [${PAYMENT_TYPES.toString()}]`)
        }
      }
      const _payment = await Payment.create({
        price, description, value, date, type, status, user_id
      }).catch((err) => {
        console.log(err)
        return null
      })
      if (!_payment) {
        throw new CustomError(500, '')
      }

      if (type === 'access') {
        if (_user.paid_access_expiration == null) _user.paid_access_expiration = now.toDate()
        const moment_paid_access_expiration = moment(_user.paid_access_expiration)

        if (moment_paid_access_expiration.isAfter(now)) {
          _user.paid_access_expiration = moment_paid_access_expiration.add((value + 1), 'days').toDate()
        } else {
          _user.paid_access_expiration = now.add((value + 1), 'days').toDate()
        }

        const _success = await _user.save().then(() => {
          return true
        }).catch((err) => {
          console.log(err)
          return false
        })

        if (!_success) {
          throw new CustomError(500, '')
        }
      }

      return res.status(201).json(_payment)
    } catch (err) {
      next(err)
    }
  }

  async meUpdate (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user_id = res.locals.user.id
      const { id } = req.params
      const { price, description, value, date, type, status } = req.body

      if (!price || !description || !value || !date || !type || !status || !user_id) {
        throw new CustomError(400, '')
      }

      const _user = await User.findByPk(user_id)

      if (!_user) {
        throw new CustomError(404, `Usuario ${user_id} não encontrado.`)
      }

      const _payment = await Payment.findOne({
        where: { id, user_id }
      })

      if (!_payment) {
        throw new CustomError(404, `Pagamento ${id} do usuário ${user_id} não encontrada.`)
      }

      _payment.price = price
      _payment.description = description
      _payment.value = value
      _payment.date = date
      _payment.type = type
      _payment.status = status
      _payment.user_id = user_id

      const _success = await _payment.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new CustomError(500, '')
      }
      return res.status(200).json(_payment)
    } catch (err) {
      next(err)
    }
  }

  async meDelete (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const user_id = res.locals.user.id

      if (!id) {
        throw new CustomError(400, '')
      }

      const _payment = await Payment.findOne({
        where: { id, user_id }
      })

      if (!_payment) {
        throw new CustomError(404, `Pagamento ${id} do usuário ${user_id} não encontrada.`)
      }

      const _success = await _payment.destroy().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new CustomError(500, '')
      }
      return res.status(204).json({})
    } catch (err) {
      next(err)
    }
  }
}
export default new PaymentsController()
