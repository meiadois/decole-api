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
            var _user = await User.findByPk(id, {
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
            _user.password = null;
            if (_user === null) {
                throw new ErrorHandler(404, `Usuario ${id} não encontrado.`);
            }
            return res.status(200).json(_user);
        } catch (err) {
            next(err);
        }

    },
    /*
    async store(req, res, next) {
        try {
            var { username, email, password } = req.body;
            if (!username || !email || !password) {
                throw new ErrorHandler(400, null);
            }
            password = await LoginService.createHashedPassword(password);

            const [_user] = await User.findOrCreate({
                where: { username, email, password }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_user) {
                throw new ErrorHandler(500, null);
            }
            _user.password = null;
            return res.status(201).json(_user);
        } catch (err) {
            next(err);
        }
    },*/
    async update(req, res, next) {
        try {
            var { id } = req.params;
            var { username, email } = req.body;
            if (!username || !email) {
                throw new ErrorHandler(400, null);
            }
            const _user = await User.findByPk(id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuario ${id} não encontrado.`);
            }

            _user.username = username;
            _user.email = email;

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
                throw new ErrorHandler(404, `Usuario ${id} não encontrado.`);
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
    async meIndex(req, res, next) {
        try {
            var { id } = res.locals.user;

            if (!id) {
                throw new ErrorHandler(404, null);
            }
            var _user = await User.findByPk(id, {
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

            if (_user === null) {
                throw new ErrorHandler(404, `Usuario ${id} não encontrado.`);
            }
            _user.password = null;
            return res.status(200).json(_user);
        } catch (err) {
            next(err);
        }

    },
    async meUpdate(req, res, next) {
        try {
            var { id } = res.locals.user;
            var { username, email } = req.body;
            if (!username || !email) {
                throw new ErrorHandler(400, null);
            }
            const _user = await User.findByPk(id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuario ${id} não encontrado.`);
            }

            _user.username = username;
            _user.email = email;

            var _success = await _user.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            _user.password = null;
            return res.status(200).json(_user);
        } catch (err) {
            next(err);
        }

    },
    async meDelete(req, res, next) {
        try {
            var { id } = res.locals.user;
            if (!id) {
                throw new ErrorHandler(400, null);
            }

            const _user = await User.findByPk(id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuario ${id} não encontrado.`);
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
    async listMeCompany(req, res, next) {
        try {
            var { id } = res.locals.user;
            if (!id) {
                throw new ErrorHandler(400, null);
            }

            const _user = await User.findByPk(id, {
                include: [
                    {
                        association: 'companies'
                    },
                ]
            });

            if (!_user) {
                throw new ErrorHandler(404, "Usuário não encontrada");
            }

            return res.status(200).json(await _user.companies);
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
    },
    async storeMeCompany(req, res, next) {
        try {
            var { id } = res.locals.user;
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
    async updateMeCompany(req, res, next) {
        try {
            var { id } = res.locals.user;
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
    async deleteMeCompany(req, res, next) {
        try {
            var { id } = res.locals.user;
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