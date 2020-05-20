import { Request, Response, NextFunction } from 'express'
import { ErrorHandler } from '../helpers/ErrorHandler'
import { User } from '../models/User'
import { Company } from '../models/Company'

import LoginService from '../services/LoginService'

class UsersController {
  async list (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const _users = await User.findAll({
        include: [
          {
            association: 'routes'
          },
          {
            association: 'companies'
          }
        ]
      })
      res.json(_users)
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
      const _user = await User.findByPk(id, {
        include: [
          {
            association: 'routes'
          },
          {
            association: 'companies'
          },
          {
            association: 'done_lessons'
          },
          {
            association: 'done_routes'
          }
        ]
      })

      if (_user === null) {
        throw new ErrorHandler(404, `Usuario ${id} não encontrado.`)
      }
      _user.password = ''
      return res.status(200).json(_user)
    } catch (err) {
      next(err)
    }
  }

  /*
    async store(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            var { name, email, password } = req.body;
            if (!name || !email || !password) {
                throw new ErrorHandler(400, '');
            }
            password = await LoginService.createHashedPassword(password);

            const [_user] = await User.findOrCreate({
                where: { name, email, password }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_user) {
                throw new ErrorHandler(500, '');
            }
            _user.password = null;
            return res.status(201).json(_user);
        } catch (err) {
            next(err);
        }
    }, */
  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { name, email, introduced } = req.body
      if (!name || !email) {
        throw new ErrorHandler(400, '')
      }
      const _user = await User.findByPk(id)

      if (!_user) {
        throw new ErrorHandler(404, `Usuario ${id} não encontrado.`)
      }

      _user.name = name
      _user.email = email
      if (introduced !== undefined) {
        if (typeof introduced === 'boolean') {
          _user.introduced = introduced
        } else {
          throw new ErrorHandler(404, '\'introduced\' deve ser booleano.')
        }
      }

      const _success = await _user.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new ErrorHandler(500, '')
      }
      return res.status(200).json(_user)
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

      const _user = await User.findByPk(id)

      if (!_user) {
        throw new ErrorHandler(404, `Usuario ${id} não encontrado.`)
      }

      const _success = await _user.destroy().then(() => {
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

  async meIndex (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = res.locals.user

      if (!id) {
        throw new ErrorHandler(404, '')
      }
      const _user = await User.findByPk(id, {
        include: [
          {
            association: 'routes'
          },
          {
            association: 'companies'
          },
          {
            association: 'done_lessons'
          },
          {
            association: 'done_routes'
          }
        ]
      })

      if (_user === null) {
        throw new ErrorHandler(404, `Usuario ${id} não encontrado.`)
      }
      _user.password = ''
      return res.status(200).json(_user)
    } catch (err) {
      next(err)
    }
  }

  async meUpdate (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = res.locals.user
      const { name, email, introduced } = req.body
      if (!name || !email) {
        throw new ErrorHandler(400, '')
      }
      const _user = await User.findByPk(id)

      if (!_user) {
        throw new ErrorHandler(404, `Usuario ${id} não encontrado.`)
      }

      _user.name = name
      _user.email = email
      if (introduced !== undefined) {
        if (typeof introduced === 'boolean') {
          _user.introduced = introduced
        } else {
          throw new ErrorHandler(404, '\'introduced\' deve ser booleano.')
        }
      }

      const _success = await _user.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new ErrorHandler(500, '')
      }
      _user.password = ''
      return res.status(200).json(_user)
    } catch (err) {
      next(err)
    }
  }

  async meChangePassword (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = res.locals.user
      const { password } = req.body
      if (!password) {
        throw new ErrorHandler(400, '')
      }
      const _user = await User.findByPk(id)

      if (!_user) {
        throw new ErrorHandler(404, `Usuario ${id} não encontrado.`)
      }

      _user.password = await LoginService.createHashedPassword(password)

      const _success = await _user.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new ErrorHandler(500, '')
      }
      return res.status(200).json()
    } catch (err) {
      next(err)
    }
  }

  async meIntroduce (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = res.locals.user
      if (!id) {
        throw new ErrorHandler(400, '')
      }
      const _user = await User.findByPk(id)

      if (!_user) {
        throw new ErrorHandler(404, `Usuario ${id} não encontrado.`)
      }

      _user.introduced = true

      const _success = await _user.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new ErrorHandler(500, '')
      }
      _user.password = ''
      return res.status(200).json(_user)
    } catch (err) {
      next(err)
    }
  }

  async meDelete (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = res.locals.user
      if (!id) {
        throw new ErrorHandler(400, '')
      }

      const _user = await User.findByPk(id)

      if (!_user) {
        throw new ErrorHandler(404, `Usuario ${id} não encontrado.`)
      }

      const _success = await _user.destroy().then(() => {
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

  async listMeCompany (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = res.locals.user
      if (!id) {
        throw new ErrorHandler(400, '')
      }

      const _user = await User.findByPk(id, {
        include: [
          {
            association: 'companies'
          }
        ]
      })

      if (!_user) {
        throw new ErrorHandler(404, 'Usuário não encontrada')
      }

      return res.status(200).json(await _user.companies)
    } catch (err) {
      next(err)
    }
  }

  async storeCompany (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { user_id } = req.body
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

      if (company_ != null) {
        throw new ErrorHandler(400, `Já há uma empresa cadastrada pelo usuário [${id}].`)
      }
      const { company_ids } = req.body
      if (!id || !company_ids) {
        throw new ErrorHandler(400, '')
      }

      const _user = await User.findByPk(id, {
        include: [
          {
            association: 'routes'
          },
          {
            association: 'companies'
          }
        ]
      })

      if (!_user) {
        throw new ErrorHandler(404, 'Usuário não encontrada')
      }

      for (const i in company_ids) {
        const _company = await Company.findByPk(company_ids[i])
        if (!_company) {
          throw new ErrorHandler(404, `Empresa ${company_ids[i]} não encontrada.`)
        }

        const _success = await _user.addCompany(_company).then(() => {
          return true
        }).catch((err) => {
          console.log(err)
          return false
        })

        if (!_success) {
          throw new ErrorHandler(500, '')
        }
      }

      return res.status(201).json(await _user.reload())
    } catch (err) {
      next(err)
    }
  }

  async updateCompany (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { company_ids } = req.body
      if (!id || !company_ids) {
        throw new ErrorHandler(400, '')
      }

      const _user = await User.findByPk(id, {
        include: [
          {
            association: 'routes'
          },
          {
            association: 'companies'
          }
        ]
      })

      if (!_user) {
        throw new ErrorHandler(404, 'Usuário não encontrada')
      }

      const _associated_companies = _user.getCompanies()
      ;(await _associated_companies).forEach(async (company) => {
        await _user.removeCompany(company).catch((err) => {
          console.log(err)
        })
      })

      for (const i in company_ids) {
        const _company = await Company.findByPk(company_ids[i])
        if (!_company) {
          throw new ErrorHandler(404, `Empresa ${company_ids[i]} não encontrada.`)
        }

        const _success = await _user.addCompany(_company).then(() => {
          return true
        }).catch((err) => {
          console.log(err)
          return false
        })

        if (!_success) {
          throw new ErrorHandler(500, '')
        }
      }

      return res.status(201).json(await _user.reload())
    } catch (err) {
      next(err)
    }
  }

  async deleteCompany (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { company_ids } = req.body
      if (!id || !company_ids) {
        throw new ErrorHandler(400, '')
      }

      const _user = await User.findByPk(id, {
        include: [
          {
            association: 'routes'
          },
          {
            association: 'companies'
          }
        ]
      })

      if (!_user) {
        throw new ErrorHandler(404, 'Usuário não encontrada')
      }

      for (const i in company_ids) {
        const _company = await Company.findByPk(company_ids[i])
        if (!_company) {
          throw new ErrorHandler(404, `Empresa ${company_ids[i]} não encontrada.`)
        }

        const _success = await _user.removeCompany(_company).then(() => {
          return true
        }).catch((err) => {
          console.log(err)
          return false
        })

        if (!_success) {
          throw new ErrorHandler(500, '')
        }
      }
      return res.status(204).json({})
    } catch (err) {
      next(err)
    }
  }

  async storeMeCompany (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = res.locals.user
      const { company_ids } = req.body
      if (!id || !company_ids) {
        throw new ErrorHandler(400, '')
      }

      const _user = await User.findByPk(id, {
        include: [
          {
            association: 'routes'
          },
          {
            association: 'companies'
          }
        ]
      })

      if (!_user) {
        throw new ErrorHandler(404, 'Usuário não encontrada')
      }

      for (const i in company_ids) {
        const _company = await Company.findByPk(company_ids[i])
        if (!_company) {
          throw new ErrorHandler(404, `Empresa ${company_ids[i]} não encontrada.`)
        }

        const _success = await _user.addCompany(_company).then(() => {
          return true
        }).catch((err) => {
          console.log(err)
          return false
        })

        if (!_success) {
          throw new ErrorHandler(500, '')
        }
      }

      return res.status(201).json(await _user.reload())
    } catch (err) {
      next(err)
    }
  }

  async updateMeCompany (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = res.locals.user
      const { company_ids } = req.body
      if (!id || !company_ids) {
        throw new ErrorHandler(400, '')
      }

      const _user = await User.findByPk(id, {
        include: [
          {
            association: 'routes'
          },
          {
            association: 'companies'
          }
        ]
      })

      if (!_user) {
        throw new ErrorHandler(404, 'Usuário não encontrada')
      }

      const _associated_companies = _user.getCompanies()
      ;(await _associated_companies).forEach(async (company) => {
        await _user.removeCompany(company).catch((err) => {
          console.log(err)
        })
      })

      for (const i in company_ids) {
        const _company = await Company.findByPk(company_ids[i])
        if (!_company) {
          throw new ErrorHandler(404, `Empresa ${company_ids[i]} não encontrada.`)
        }

        const _success = await _user.addCompany(_company).then(() => {
          return true
        }).catch((err) => {
          console.log(err)
          return false
        })

        if (!_success) {
          throw new ErrorHandler(500, '')
        }
      }

      return res.status(201).json(await _user.reload())
    } catch (err) {
      next(err)
    }
  }

  async deleteMeCompany (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = res.locals.user
      const { company_ids } = req.body
      if (!id || !company_ids) {
        throw new ErrorHandler(400, '')
      }

      const _user = await User.findByPk(id, {
        include: [
          {
            association: 'routes'
          },
          {
            association: 'companies'
          }
        ]
      })

      if (!_user) {
        throw new ErrorHandler(404, 'Usuário não encontrada')
      }

      for (const i in company_ids) {
        const _company = await Company.findByPk(company_ids[i])
        if (!_company) {
          throw new ErrorHandler(404, `Empresa ${company_ids[i]} não encontrada.`)
        }

        const _success = await _user.removeCompany(_company).then(() => {
          return true
        }).catch((err) => {
          console.log(err)
          return false
        })

        if (!_success) {
          throw new ErrorHandler(500, '')
        }
      }

      return res.status(204).json({})
    } catch (err) {
      next(err)
    }
  }
}
export default new UsersController()
