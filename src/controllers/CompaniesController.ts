import { Request, Response, NextFunction } from 'express'
import { ErrorHandler } from '../helpers/ErrorHandler'
import { Company } from '../models/Company'
import { User } from '../models/User'
import { Op } from 'sequelize'
import { Like } from '../models/Like'
import UploadHelper, { Files, File } from '../helpers/UploadHelper'
import * as path from 'path'

class CompaniesController {
  async list (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const _company = await Company.findAll({
        include: [
          Company.associations.sent_likes,
          Company.associations.received_likes,
          Company.associations.users
        ]
      })
      return res.json(_company)
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
      let _company = null
      try {
        _company = await Company.findByPk(id, {
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'segment_id']
          },
          include: [
            Company.associations.sent_likes,
            Company.associations.received_likes,
            Company.associations.users,
            {
              association: Company.associations.segment,
              attributes: {
                exclude: ['createdAt', 'updatedAt']
              }
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
    } catch (err) {
      next(err)
    }
  }

  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const company = req.body as Company

      const nResults = await Company.count({ where: { id: company.cnpj } })

      if (nResults !== 0) {
        throw new ErrorHandler(400, `Já existe uma empresa com o CNPJ [${company.cnpj}].`)
      }
      const _company = await Company.create(company)
        .catch((err) => {
          console.log(err)
          return null
        })
      if (!_company) {
        throw new ErrorHandler(500, '')
      }

      return res.status(201).json(_company)
    } catch (err) {
      next(err)
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const company = req.body as Company
      const _company = await Company.findByPk(id)

      if (!_company) {
        throw new ErrorHandler(404, `Empresa ${id} não encontrada.`)
      }

      _company.name = company.name
      _company.cep = company.cep
      _company.segment_id = company.segment_id
      _company.description = company.description
      _company.cellphone = company.cellphone
      _company.email = company.email
      _company.visible = company.visible
      _company.city = company.city
      _company.neighborhood = company.neighborhood

      if (company.thumbnail !== null) _company.thumbnail = company.thumbnail
      if (company.banner !== null) _company.banner = company.banner
      if (company.cnpj !== null) _company.cnpj = company.cnpj

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
    } catch (err) {
      next(err)
    }
  }

  async meList (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
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
            association: Company.associations.users,
            attributes: [],
            where: {
              id: user_id
            }
          },
          {
            association: 'segment',
            attributes: ['id', 'name']
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
    } catch (err) {
      next(err)
    }
  }

  async meIndex (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
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
    } catch (err) {
      next(err)
    }
  }

  async meStore (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const files = await UploadHelper.processCompaniesImages(req.files)
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

      const company = req.body as Company
      company.banner = files.banner
      company.thumbnail = files.thumbnail

      if (company.cnpj !== null) {
        const nResults = await Company.count({ where: { cnpj: company.cnpj } })

        if (nResults !== 0) {
          throw new ErrorHandler(400, `Já existe uma empresa com o CNPJ [${company.cnpj}].`)
        }
      }

      const _user = await User.findByPk(user_id)
      if (!_user) {
        throw new ErrorHandler(404, 'Usuário não encontrada')
      }

      const _company = await Company.create(company).catch((err) => {
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
    } catch (err) {
      next(err)
    }
  }

  async meUpdate (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user_id = res.locals.user.id
      const company = req.body as Company

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

      if (company.cnpj !== null && company.cnpj !== _company.cnpj) {
        const nResults = await Company.count({ where: { cnpj: company.cnpj } })

        if (nResults !== 0) {
          throw new ErrorHandler(400, `Já existe uma empresa com o CNPJ [${company.cnpj}].`)
        }
      }

      _company.name = company.name
      _company.cep = company.cep
      _company.segment_id = company.segment_id
      _company.description = company.description
      _company.cellphone = company.cellphone
      _company.email = company.email
      _company.visible = company.visible
      _company.city = company.city
      _company.neighborhood = company.neighborhood

      if (company.thumbnail !== null) _company.thumbnail = company.thumbnail
      if (company.banner !== null) _company.banner = company.banner
      if (company.cnpj !== null) _company.cnpj = company.cnpj

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
    } catch (err) {
      next(err)
    }
  }

  async meDelete (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
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
    } catch (err) {
      next(err)
    }
  }

  async search (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      let { limit = 10, offset = 0, name, segment_id, email, cep, cnpj, cellphone, city, neighborhood } = req.query
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
      const _company = await Company.findAll({
        limit,
        offset,
        where,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'segment_id', 'visible',
            'city', 'neighborhood', 'cep']
        },
        include
      })
      return res.json(_company)
    } catch (err) {
      next(err)
    }
  }

  async meSearch (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user_id = res.locals.user.id

      const _user_company = await Company.findOne({

        attributes: {
          exclude: ['name', 'description', 'cnpj', 'cellphone', 'email', 'thumbnail', 'banner']
        },
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
      if (!_user_company) {
        throw new ErrorHandler(404, `Empresa do usuário ${user_id} não encontrada.`)
      }
      let { limit = 10, offset = 0, name, segment_id, email, cep, cnpj, cellphone, city, neighborhood } = req.query
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

      const _associated_companies = await Like.findAll({
        attributes: {
          include: ['id']
        },
        where: {
          [Op.or]: [
            {
              sender_id: _user_company.id
            },
            {
              recipient_id: _user_company.id
            }

          ]
        }
      })
      let _associated_company_ids = _associated_companies.map((obj) => {
        if (obj.sender_id === _user_company.id) {
          return obj.recipient_id
        }
        return obj.sender_id
      })
      _associated_company_ids = _associated_company_ids.filter((value, index, self) => self.indexOf(value) === index) // get only unique values
      _associated_company_ids.push(_user_company.id) // Dont search the user company
      let where = {}
      if (ORs.length > 0) {
        where = {
          [Op.and]: ANDs,
          [Op.or]: ORs,
          [Op.not]: [
            {
              id: _associated_company_ids
            }
          ]
        }
      } else {
        where = {
          [Op.and]: ANDs,
          [Op.not]: [
            {
              id: _associated_company_ids
            }
          ]
        }
      }
      const _company = await Company.findAll({
        limit,
        offset,
        where,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'segment_id', 'visible',
            'city', 'neighborhood', 'cep']
        },
        include
      })
      return res.json(_company)
    } catch (err) {
      next(err)
    }
  }

  async upload (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    // const files = req.files as { [fieldname: string]: File[] }
    const files = await UploadHelper.processCompaniesImages(req.files)
    // const banner = files.banner[0] as unknown as File
    // const thumbnail = files.thumbnail[0] as unknown as File
    // console.log(UploadHelper.parsePathToUnix(banner.path))
    // const publicFolder = path.resolve(__dirname, '..', 'public')
    // const relativePath = path.relative(banner.path, UploadHelper.publicFolder)

    return res.json(req.body)
  }
}
export default new CompaniesController()
