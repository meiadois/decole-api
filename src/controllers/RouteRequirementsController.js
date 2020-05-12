const database = require('../models');
const RouteRequirement = database.RouteRequirement;
const Route = database.Route;
const Step = database.Step;

const { ErrorHandler } = require('../helpers/error');

module.exports = {
    async list(req, res, next) {
        try {
            const _route_requirements = await RouteRequirement.findAll({
                include: [
                    {
                        association: 'required_route'
                    },
                    {
                        association: 'route'
                    },
                ]
            });
            res.json(_route_requirements);
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
            var _route_requirement = await RouteRequirement.findByPk(id, {
                include: [
                    {
                        association: 'required_route'
                    },
                    {
                        association: 'route'
                    },
                ]
            });

            if (_route_requirement === null) {
                throw new ErrorHandler(404, `Requisito ${id} não encontrado.`);
            }
            return res.status(200).json(_route_requirement);
        } catch (err) {
            next(err);
        }

    },
    async store(req, res, next) {
        try {
            var { route_id, required_route_id } = req.body;
            if (!route_id || !required_route_id) {
                throw new ErrorHandler(400, null);
            }


            const _route = await Route.findByPk(route_id);

            if (!_route) {
                throw new ErrorHandler(404, `Rota ${route_id} não encontrada.`);
            }

            const required_route = await Route.findByPk(required_route_id);

            if (!required_route) {
                throw new ErrorHandler(404, `Rota Requerida ${id} não encontrado.`);
            }

            const nResults = await RouteRequirement.findAll({
                where: {
                    route_id,
                    required_route_id,
                }
            }).then((result) => {
                return result.length
            });
            console.log(nResults)
            if (nResults != 0) {
                throw new ErrorHandler(400, `A rota [${required_route_id}] já é requisito da rota [${route_id}].`);
            }

            const _route_requirement = await RouteRequirement.create({
                route_id,
                required_route_id,
            }).then((result) => result)
                .catch((err) => {
                    console.log(err);
                    return null;
                });

            if (!_route_requirement) {
                throw new ErrorHandler(500, null);
            }


            return res.status(201).json(_route_requirement);
        } catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            var { id } = req.params;
            var { route_id, required_route_id } = req.body;
            if (!route_id || !required_route_id) {
                throw new ErrorHandler(400, null);
            }

            const _route_requirement = await RouteRequirement.findByPk(id);

            if (!_route_requirement) {
                throw new ErrorHandler(404, `Requisito ${id} não encontrado.`);
            }


            _route_requirement.route_id = route_id;
            _route_requirement.required_route_id = required_route_id;

            var _success = await _route_requirement.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(200).json(_route_requirement);
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

            const _route_requirement = await RouteRequirement.findByPk(id);

            if (!_route_requirement) {
                throw new ErrorHandler(404, `Requisito ${id} não encontrado.`);
            }

            var _success = await _route_requirement.destroy().then(() => {
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