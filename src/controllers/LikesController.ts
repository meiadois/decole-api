import { Request, Response, NextFunction } from 'express'
import { Like } from '@models/Like'
import { Company } from '@models/Company'
import CustomError from '@utils/CustomError'
import { Op } from 'sequelize'

const VALID_STATUS = ['pending', 'accepted', 'denied', 'deleted']

function is_valid_status (status: string): boolean {
  return VALID_STATUS.indexOf(status) >= 0
}
interface JsonObject {
    [key: string]: any;
}
class LikesController {
  async list (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      let { status, sender_id, recipient_id } = req.query
      status = status as string

      const where: JsonObject = {}
      if (status !== undefined) {
        if (status != null) {
          if (!is_valid_status(status)) {
            throw new CustomError(400, `[${status}] não é um status válido. Estes são os status possíveis: [${VALID_STATUS.toString()}]`)
          }
        }
        where.status = status
      }
      if (sender_id !== undefined) {
        where.sender_id = sender_id
      }
      if (recipient_id !== undefined) {
        where.recipient_id = recipient_id
      }

      const _likes = await Like.findAll({
        where,
        include: [
          {
            association: 'sender_company'
          },
          {
            association: 'recipient_company'
          }
        ]
      })
      res.json(_likes)
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
      let _like = null
      try {
        _like = await Like.findByPk(id, {
          include: [
            {
              association: 'sender_company'
            },
            {
              association: 'recipient_company'
            }
          ]
        })
      } catch (err) {
        console.log(err)
      }

      if (_like === null) {
        throw new CustomError(404, `Canal ${id} não encontrado.`)
      }
      return res.status(200).json(_like)
    } catch (err) {
      next(err)
    }
  }

  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { sender_id, recipient_id } = req.body

      const nResults = await Like.count({
        where: {
          [Op.or]: [
            {
              sender_id,
              recipient_id
            },
            {
              sender_id: recipient_id,
              recipient_id: sender_id
            }
          ]
        }
      })

      if (nResults !== 0) {
        throw new CustomError(400, `Já existe um like entre as empresas [${sender_id}] e [${recipient_id}].`)
      }

      const [_like] = await Like.findOrCreate({
        where: { sender_id, recipient_id }
      }).catch((err) => {
        console.log(err)
        return null
      })
      if (!_like) {
        throw new CustomError(500, '')
      }
      return res.status(201).json(_like)
    } catch (err) {
      next(err)
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { sender_id, recipient_id, status = null } = req.body
      if (!sender_id || !recipient_id) {
        throw new CustomError(400, '')
      }
      if (status != null) {
        if (!is_valid_status(status)) {
          throw new CustomError(400, `[${status}] não é um status válido. Estes são os status possíveis: [${VALID_STATUS.toString()}]`)
        }
      }

      const nResultsSender = await Company.count({ where: { id: sender_id } })

      if (nResultsSender === 0) {
        throw new CustomError(400, `Não existe uma empresa com o id [${sender_id}].`)
      }

      const nResultsRecipient = await Company.count({ where: { id: recipient_id } })

      if (nResultsRecipient === 0) {
        throw new CustomError(400, `Não existe uma empresa com o id [${recipient_id}].`)
      }

      const _like = await Like.findByPk(id)

      if (!_like) {
        throw new CustomError(404, `Like ${id} não encontrado.`)
      }

      _like.sender_id = sender_id
      _like.recipient_id = recipient_id
      if (status !== null) {
        if (_like.status !== 'accepted' && status === 'accepted') {
          _like.accepted_at = new Date()
        }
        _like.status = status
      }

      const _success = await _like.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new CustomError(500, '')
      }
      return res.status(200).json(_like)
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

      const _like = await Like.findByPk(id)

      if (!_like) {
        throw new CustomError(404, `Like ${id} não encontrado.`)
      }

      const _success = await _like.destroy().then(() => {
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
      const _company = await Company.findOne({
        include: [
          {
            association: Company.associations.users,
            attributes: [],
            where: {
              id: user_id
            }
          }
        ]
      })

      if (_company === null) {
        throw new CustomError(404, `Empresa do usuário ${user_id} não encontrada.`)
      }
      let { status } = req.query
      status = status as string
      const ANDs = []
      const ORs = []

      if (status !== undefined) {
        if (status != null) {
          if (!is_valid_status(status)) {
            throw new CustomError(400, `[${status}] não é um status válido. Estes são os status possíveis: [${VALID_STATUS.toString()}]`)
          }
        }
        ANDs.push({ status })
      }
      ORs.push({
        sender_id: _company.id
      })
      ORs.push({
        recipient_id: _company.id
      })

      let where: JsonObject = {}
      if (ORs.length > 0) {
        where = {
          [Op.and]: ANDs,
          [Op.or]: ORs
        }
      } else {
        where = {
          [Op.and]: ANDs
        }
      }
      const _likes = await Like.findAll({
        where,

        attributes: {
          exclude: ['createdAt', 'updatedAt', 'sender_id', 'recipient_id']
        },

        include: [
          {
            association: 'sender_company',

            attributes: {
              exclude: ['createdAt', 'updatedAt', 'segment_id']
            },
            include: [
              {
                association: 'segment',
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              }
            ]
          },
          {
            association: 'recipient_company',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'segment_id']
            },
            include: [
              {
                association: 'segment',
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              }
            ]
          }
        ]
      })
      return res.json(_likes)
    } catch (err) {
      next(err)
    }
  }

  async meSentList (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user_id = res.locals.user.id
      const _company = await Company.findOne({
        include: [
          {
            association: Company.associations.users,
            attributes: [],
            where: {
              id: user_id
            }
          }
        ]
      })

      if (_company === null) {
        throw new CustomError(404, `Empresa do usuário ${user_id} não encontrada.`)
      }
      let { status } = req.query
      status = status as string
      const ANDs = []

      if (status !== undefined) {
        if (status != null) {
          if (!is_valid_status(status)) {
            throw new CustomError(400, `[${status}] não é um status válido. Estes são os status possíveis: [${VALID_STATUS.toString()}]`)
          }
        }
        ANDs.push({ status })
      }
      ANDs.push({ sender_id: _company.id })

      let where: JsonObject = {}
      where = {
        [Op.and]: ANDs
      }
      const _likes = await Like.findAll({
        where,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'sender_id', 'recipient_id']
        },

        include: [
          {
            association: 'recipient_company',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'segment_id']
            },
            include: [
              {
                association: 'segment',
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              }
            ]
          }
        ]
      })
      return res.json(_likes)
    } catch (err) {
      next(err)
    }
  }

  async meReceivedList (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user_id = res.locals.user.id
      const _company = await Company.findOne({
        include: [
          {
            association: Company.associations.users,
            attributes: [],
            where: {
              id: user_id
            }
          }
        ]
      })

      if (_company === null) {
        throw new CustomError(404, `Empresa do usuário ${user_id} não encontrada.`)
      }
      let { status } = req.query
      status = status as string
      const ANDs = []

      if (status !== undefined) {
        if (status != null) {
          if (!is_valid_status(status)) {
            throw new CustomError(400, `[${status}] não é um status válido. Estes são os status possíveis: [${VALID_STATUS.toString()}]`)
          }
        }
        ANDs.push({ status })
      }
      ANDs.push({ recipient_id: _company.id })

      let where: JsonObject = {}
      where = {
        [Op.and]: ANDs
      }
      const _likes = await Like.findAll({
        where,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'sender_id', 'recipient_id']
        },

        include: [
          {
            association: 'sender_company',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'segment_id']
            },
            include: [
              {
                association: 'segment',
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              }
            ]
          }
        ]
      })
      return res.json(_likes)
    } catch (err) {
      next(err)
    }
  }
}
export default new LikesController()
