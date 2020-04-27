const database = require('../models');
const Route = database.Route;
const DoneRoute = database.DoneRoute;
const User = database.User;

const { ErrorHandler } = require('../helpers/error');

module.exports = {
    async list(req, res, next) {
        try {
            const _done_route = await DoneRoute.findAll({
                include: [
                    {
                        association: 'user'
                    },
                    {
                        association: 'route'
                    },
                ]
            });
            res.json(_done_route);
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
            var _done_route = null;
            try {
                _done_route = await DoneRoute.findByPk(id, {
                    include: [
                        {
                            association: 'user'
                        },
                        {
                            association: 'route'
                        },
                    ]
                });
            } catch (err) {
                console.log(err)
            }

            if (_done_route === null) {
                throw new ErrorHandler(404, null);
            }
            return res.status(200).json(_done_route);
        } catch (err) {
            next(err);
        }

    },
    async store(req, res, next) {
        try {
            var { user_id, route_id } = req.body;
            if (!user_id || !route_id) {
                throw new ErrorHandler(400, null);
            }

            const _route = await Route.findByPk(route_id);

            if (!_route) {
                throw new ErrorHandler(404, `Rota ${route_id} não encontrada.`);
            }

            const _user = await User.findByPk(user_id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`);
            }

            const [_done_route] = await DoneRoute.findOrCreate({
                where: { user_id, route_id }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_done_route) {
                throw new ErrorHandler(500, null);
            }

            return res.status(201).json(_done_route);
        } catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            var { id } = req.params;
            var { user_id, route_id } = req.body;
            if (!user_id || !route_id) {
                throw new ErrorHandler(400, null);
            }

            const _done_route = await DoneRoute.findByPk(id);

            if (!_done_route) {
                throw new ErrorHandler(404, null);
            }

            const _route = await Route.findByPk(route_id);

            if (!_route) {
                throw new ErrorHandler(404, `Rota ${route_id} não encontrada.`);
            }

            const _user = await User.findByPk(user_id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`);
            }

            _done_route.user_id = user_id;
            _done_route.route_id = route_id;

            var _success = await _done_route.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(200).json(_done_route);
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

            const _done_route = await DoneRoute.findByPk(id);

            if (!_done_route) {
                throw new ErrorHandler(404, null);
            }

            var _success = await _done_route.destroy().then(() => {
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
};