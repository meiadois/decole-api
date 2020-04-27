const database = require('../models');
const Company = database.Company;
const User = database.User;

const { ErrorHandler } = require('../helpers/error');

module.exports = {
    async list(req, res, next) {
        try {
            const _users = await User.findAll({
                include: [
                    {
                        association: 'routes'
                    },
                    {
                        association: 'companies'
                    },
                ]
            });
            res.json(_users);
        } catch (err) {
            next(err);
        }
    },
    async index(req, res, next) {
        try {
            var { id } = req.params;

            if (!id) {
                throw new ErrorHandler(404, null);
            }
            var _user = null;
            try {
                _user = await User.findByPk(id, {
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
                        },
                    ]
                });
            } catch (err) {
                console.log(err)
            }

            if (_user === null) {
                throw new ErrorHandler(404, null);
            }
            return res.status(200).json(_user);
        } catch (err) {
            next(err);
        }

    },
    async store(req, res, next) {
        try {
            var { username, email, password } = req.body;
            if (!username || !email || !password) {
                throw new ErrorHandler(400, null);
            }

            const [_user] = await User.findOrCreate({
                where: { username, email, password }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_user) {
                throw new ErrorHandler(500, null);
            }

            return res.status(201).json(_user);
        } catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            var { id } = req.params;
            var { username, email, password } = req.body;
            if (!username || !email || !password) {
                throw new ErrorHandler(400, null);
            }

            const _user = await User.findByPk(id);

            if (!_user) {
                throw new ErrorHandler(404, null);
            }

            _user.username = username;
            _user.email = email;
            _user.password = password;

            var _success = await _user.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(200).json(_user);
        } catch (err) {
            next(err);
        }

    },
    async delete(req, res, next) {
        try {
            var { id } = req.params;
            if (!id) {
                throw new ErrorHandler(400, null);
            }

            const _user = await User.findByPk(id);

            if (!_user) {
                throw new ErrorHandler(404, null);
            }

            var _success = await _user.destroy().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(204).json({});

        } catch (err) {
            next(err);
        }
    },
    async storeCompany(req, res, next) {
        try {
            var { id } = req.params;
            var { company_ids } = req.body;
            if (!id || !company_ids) {
                throw new ErrorHandler(400, null);
            }

            const _user = await User.findByPk(id, {
                include: [
                    {
                        association: 'routes'
                    },
                    {
                        association: 'companies'
                    },
                ]
            });

            if (!_user) {
                throw new ErrorHandler(404, "Usuário não encontrada");
            }
            var _companies = [];

            for (var i in company_ids) {
                var _company = await Company.findByPk(company_ids[i]);
                if (!_company) {
                    throw new ErrorHandler(404, `Empresa ${company_ids[i]} não encontrada.`);
                }

                _companies.push(_company);
            }


            var _success = await _user.addCompanies(_companies).then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(201).json(await _user.reload());
        } catch (err) {
            next(err);
        }
    },
    async updateCompany(req, res, next) {
        try {
            var { id } = req.params;
            var { company_ids } = req.body;
            if (!id || !company_ids) {
                throw new ErrorHandler(400, null);
            }

            const _user = await User.findByPk(id, {
                include: [
                    {
                        association: 'routes'
                    },
                    {
                        association: 'companies'
                    },
                ]
            });

            if (!_user) {
                throw new ErrorHandler(404, "Usuário não encontrada");
            }
            var _companies = [];

            for (var i in company_ids) {
                var _company = await Company.findByPk(company_ids[i]);
                if (!_company) {
                    throw new ErrorHandler(404, `Empresa ${company_ids[i]} não encontrada.`);
                }

                _companies.push(_company);
            }


            var _success = await _user.setCompanies(_companies).then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(201).json(await _user.reload());
        } catch (err) {
            next(err);
        }
    },
    async deleteCompany(req, res, next) {
        try {
            var { id } = req.params;
            var { company_ids } = req.body;
            if (!id || !company_ids) {
                throw new ErrorHandler(400, null);
            }

            const _user = await User.findByPk(id, {
                include: [
                    {
                        association: 'routes'
                    },
                    {
                        association: 'companies'
                    },
                ]
            });

            if (!_user) {
                throw new ErrorHandler(404, "Usuário não encontrada");
            }
            var _companies = [];

            for (var i in company_ids) {
                var _company = await Company.findByPk(company_ids[i]);
                if (!_company) {
                    throw new ErrorHandler(404, `Empresa ${company_ids[i]} não encontrada.`);
                }

                _companies.push(_company);
            }


            var _success = await _user.removeCompanies(_companies).then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(204).json({});
        } catch (err) {
            next(err);
        }
    }
};