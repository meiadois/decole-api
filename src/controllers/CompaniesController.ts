import { Request, Response } from 'express'
import { ErrorHandler } from '../helpers/error'
import { Company } from '../models/Company'
import { User } from '../models/User'

import { Op } from 'sequelize/types'

class CompaniesController {
  async list (req: Request, res: Response): Promise<Response> {
    const _company = await Company.findAll({
      include: [
        {
          association: 'sent_likes'
        },
        {
          association: 'received_likes'
        },
        {
          association: 'users'
        }
      ]
    })
    return res.json(_company)
  }

  async index (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    if (!id) {
      throw new ErrorHandler(404, '')
    }
    let _company = null
    try {
      _company = await Company.findByPk(id, {
        include: [
          {
            association: 'received_likes'
          },
          {
            association: 'sent_likes'
          },
          {
            association: 'users'
          }
        ]
      })
    } catch (err) {
      console.log(err)
    }

    if (_company === null) {
      throw new ErrorHandler(404, `Empresa ${id} não encontrada.`)
    }
    return res.status(200).json(_company)
  }

  async store (req: Request, res: Response): Promise<Response> {
    const { name, cep, thumbnail, banner, cnpj, segment_id, description, cellphone, email, visible, city, neighborhood, state, street } = req.body
    if (!name || !cep || !thumbnail || !banner || !cnpj || !segment_id || !description || !cellphone || !email || visible === undefined || !city || !neighborhood || !state || !street) {
      throw new ErrorHandler(400, '')
    }

    const nResults = await Company.count({ where: { cnpj } })

    if (nResults !== 0) {
      throw new ErrorHandler(400, `Já existe uma empresa com o CNPJ [${cnpj}].`)
    }
    const _company = await Company.create({
      name,
      cep,
      thumbnail,
      banner,
      cnpj,
      segment_id,
      description,
      cellphone,
      email,
      visible,
      city,
      neighborhood,
      state,
      street
    }).catch((err) => {
      console.log(err)
      return null
    })
    if (!_company) {
      throw new ErrorHandler(500, '')
    }

    return res.status(201).json(_company)
  }

  async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, cep, thumbnail, banner, cnpj, segment_id, description, cellphone, email, visible, city, neighborhood, state, street } = req.body
    if (!name || !cep || !thumbnail || !banner || !cnpj || !segment_id || !description || !cellphone || !email || visible === undefined || !city || !neighborhood || !state || !street) {
      throw new ErrorHandler(400, '')
    }

    const _company = await Company.findByPk(id)

    if (!_company) {
      throw new ErrorHandler(404, `Empresa ${id} não encontrada.`)
    }

    _company.name = name
    _company.cep = cep
    _company.thumbnail = thumbnail
    if (cnpj !== null) _company.cnpj = cnpj
    _company.segment_id = segment_id
    _company.description = description
    _company.cellphone = cellphone
    _company.email = email
    _company.visible = visible
    _company.banner = banner
    _company.city = city
    _company.neighborhood = neighborhood
    _company.state = state
    _company.street = street

    const _success = await _company.save().then(() => {
      return true
    }).catch((err) => {
      console.log(err)
      return false
    })

    if (!_success) {
      throw new ErrorHandler(500, '')
    }
    return res.status(200).json(_company)
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    if (!id) {
      throw new ErrorHandler(400, '')
    }

    const _company = await Company.findByPk(id)

    if (!_company) {
      throw new ErrorHandler(404, `Empresa ${id} não encontrada.`)
    }

    const _success = await _company.destroy().then(() => {
      return true
    }).catch((err) => {
      console.log(err)
      return false
    })

    if (!_success) {
      throw new ErrorHandler(500, '')
    }
    return res.status(204).json({})
  }

  async meList (req: Request, res: Response): Promise<Response> {
    const user_id = res.locals.user.id

    if (!user_id) {
      throw new ErrorHandler(400, '')
    }

    const _company = await Company.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'segment_id']
      },
      include: [
        {
          association: 'users',
          attributes: [],
          where: {
            id: user_id
          }
        },
        {
          association: 'segment',
          attributes: ['name']
        }
      ]
    })
    /*
            const _user = await User.findByPk(user_id, {
                include: [
                    {
                        association: 'companies'
                    },
                    {
                        association: 'segment',
                    }
                ]
            });

            if (!_user) {
                throw new ErrorHandler(404, "Usuário não encontrada");
            } */

    if (_company === null) {
      throw new ErrorHandler(404, `Empresa do usuário ${user_id} não encontrada.`)
    }
    return res.status(200).json(_company)
  }

  async meIndex (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const user_id = res.locals.user.id

    if (!user_id) {
      throw new ErrorHandler(400, '')
    }

    const nResults = await User.count({ where: { id: user_id } })

    if (nResults === 0) {
      throw new ErrorHandler(404, 'Usuário não encontrado')
    }

    const _company = await Company.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'segment_id']
      },
      include: [
        {
          association: 'users',
          attributes: [],
          where: {
            id: user_id
          }
        },
        {
          association: 'segment',
          attributes: ['name']
        }
      ]
    })
    if (!_company) {
      throw new ErrorHandler(404, `Empresa ${id} do usuário ${user_id} não encontrada.`)
    }

    return res.status(200).json(_company)
  }

  async meStore (req: Request, res: Response): Promise<Response> {
    const user_id = res.locals.user.id

    const company_ = await Company.findOne(
      {
        include: [
          {
            association: 'users',
            attributes: [],
            where: {
              id: user_id
            }
          }
        ]
      })

    if (company_ !== null) {
      throw new ErrorHandler(400, `Já há uma empresa cadastrada pelo usuário [${user_id}].`)
    }

    const { name, cep, thumbnail, banner, cnpj, segment_id, description, cellphone, email, visible, city, neighborhood, state, street } = req.body
    if (!name || !cep || !thumbnail || !banner || !cnpj || !segment_id || !description || !cellphone || !email || visible === undefined || !city || !neighborhood || !state || !street) {
      throw new ErrorHandler(400, '')
    }
    if (cnpj !== null) {
      const nResults = await Company.count({ where: { cnpj } })

      if (nResults !== 0) {
        throw new ErrorHandler(400, `Já existe uma empresa com o CNPJ [${cnpj}].`)
      }
    }

    const _user = await User.findByPk(user_id)
    if (!_user) {
      throw new ErrorHandler(404, 'Usuário não encontrada')
    }

    const _company = await Company.create({
      name, cep, thumbnail, banner, cnpj, segment_id, description, cellphone, email, visible, city, neighborhood, state, street
    }).catch((err) => {
      console.log(err)
      return null
    })

    if (!_company) {
      throw new ErrorHandler(500, '')
    }

    const _success = await _user.addCompany(_company).then(() => {
      return true
    }).catch((err: any) => {
      console.log(err)
      return false
    })

    if (!_success) {
      throw new ErrorHandler(500, '')
    }

    return res.status(201).json(await _company.reload())
  }

  async meUpdate (req: Request, res: Response): Promise<Response> {
    const user_id = res.locals.user.id
    const { name, cep, thumbnail, banner, cnpj, segment_id, description, cellphone, email, visible, city, neighborhood, state, street } = req.body
    if (!name || !cep || !thumbnail || !banner || !cnpj || !segment_id || !description || !cellphone || !email || visible === undefined || !city || !neighborhood || !state || !street) {
      throw new ErrorHandler(400, '')
    }

    if (!user_id) {
      throw new ErrorHandler(400, '')
    }
    const nResults = await User.count({ where: { id: user_id } })

    if (nResults === 0) {
      throw new ErrorHandler(404, 'Usuário não encontrado')
    }

    const _company = await Company.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'segment_id']
      },
      include: [
        {
          association: 'users',
          attributes: [],
          where: {
            id: user_id
          }
        },
        {
          association: 'segment',
          attributes: ['name']
        }
      ]
    })

    if (_company == null) {
      throw new ErrorHandler(404, `Empresa do usuário ${user_id} não encontrada.`)
    }

    if (cnpj !== null && cnpj !== _company.cnpj) {
      const nResults = await Company.count({ where: { cnpj } })

      if (nResults !== 0) {
        throw new ErrorHandler(400, `Já existe uma empresa com o CNPJ [${cnpj}].`)
      }
    }

    _company.name = name
    _company.cep = cep
    _company.thumbnail = thumbnail
    if (cnpj !== null) _company.cnpj = cnpj
    _company.segment_id = segment_id
    _company.description = description
    _company.cellphone = cellphone
    _company.email = email
    _company.visible = visible
    _company.banner = banner

    _company.city = city
    _company.neighborhood = neighborhood
    _company.state = state
    _company.street = street

    const _success = await _company.save().then(() => {
      return true
    }).catch((err) => {
      console.log(err)
      return false
    })

    if (!_success) {
      throw new ErrorHandler(500, '')
    }
    return res.status(200).json(await _company.reload())
  }

  async meDelete (req: Request, res: Response): Promise<Response> {
    const user_id = res.locals.user.id

    if (!user_id) {
      throw new ErrorHandler(400, '')
    }
    const nResults = await User.count({ where: { id: user_id } })

    if (nResults === 0) {
      throw new ErrorHandler(404, 'Usuário não encontrado')
    }

    const _company = await Company.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'segment_id']
      },
      include: [
        {
          association: 'users',
          attributes: [],
          where: {
            id: user_id
          }
        },
        {
          association: 'segment',
          attributes: ['name']
        }
      ]
    })

    if (_company == null) {
      throw new ErrorHandler(404, `Empresa do usuário ${user_id} não encontrada.`)
    }

    const _success = await _company.destroy().then(() => {
      return true
    }).catch((err) => {
      console.log(err)
      return false
    })

    if (!_success) {
      throw new ErrorHandler(500, '')
    }
    return res.status(204).json({})
  }

  async search (req: Request, res: Response): Promise<Response> {
    let { limit = 10, offset = 0, name, segment_id, email, cep, cnpj, cellphone, city, neighborhood, state, street } = req.query
    limit = limit as number
    offset = offset as number
    const user_where = {}
    const ANDs = []
    const ORs = []
    const include = []

    ANDs.push({
      visible: true
    })

    if (name !== undefined) {
      name = `%${name}%`
      ORs.push({
        name: {
          [Op.like]: name
        }
      })
      ORs.push({
        description: {
          [Op.like]: name
        }
      })
    }

    if (segment_id !== undefined) {
      ANDs.push({
        segment_id
      })
    }
    if (street !== undefined) {
      ANDs.push({
        street
      })
    }
    if (state !== undefined) {
      ANDs.push({
        state
      })
    }
    if (neighborhood !== undefined) {
      ANDs.push({
        neighborhood
      })
    }
    if (city !== undefined) {
      ANDs.push({
        city
      })
    }
    if (cellphone !== undefined) {
      ANDs.push({
        cellphone
      })
    }
    if (cnpj !== undefined) {
      ANDs.push({
        cnpj
      })
    }
    if (cep !== undefined) {
      ANDs.push({
        cep
      })
    }

    if (email !== undefined) {
      ANDs.push({
        email
      })
    }
    let where = {}
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

    include.push(
      {
        association: 'segment',
        attributes: ['name']
      }
    )
    if (Object.keys(user_where).length !== 0) {
      include.push({
        association: 'users',
        attributes: [],
        where: user_where
      })
    }

    const _company = await Company.findAll({
      limit,
      offset,
      where,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'segment_id', 'visible',
          'city', 'neighborhood', 'state', 'street', 'cep']
      },
      include
    })
    return res.json(_company)
  }
}
export default new CompaniesController()
