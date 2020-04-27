const database = require('../models');
const Lesson = database.Lesson;
const Route = database.Route;
const Step = database.Step;

const { ErrorHandler } = require('../helpers/error');

module.exports = {
    async list(req, res, next) {
        try {
            const _routes = await Route.findAll({
                include: [
                    {
                        association: 'lessons'
                    },
                    {
                        association: 'users'
                    },
                ]
            });
            res.json(_routes);
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
            var _route = null;
            try {
                _route = await Route.findByPk(id, {
                    include: [
                        {
                            association: 'lessons'
                        },
                        {
                            association: 'users'
                        },
                    ]
                });
            } catch (err) {
                console.log(err)
            }

            if (_route === null) {
                throw new ErrorHandler(404, `Rota ${id} não encontrada.`);
            }
            return res.status(200).json(_route);
        } catch (err) {
            next(err);
        }

    },
    async store(req, res, next) {
        try {
            var { description } = req.body;
            if (!description) {
                throw new ErrorHandler(400, null);
            }

            const [_route] = await Route.findOrCreate({
                where: { description }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_route) {
                throw new ErrorHandler(500, null);
            }

            return res.status(201).json(_route);
        } catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            var { id } = req.params;
            var { description } = req.body;
            if (!description) {
                throw new ErrorHandler(400, null);
            }

            const _route = await Route.findByPk(id);

            if (!_route) {
                throw new ErrorHandler(404, `Rota ${id} não encontrada.`);
            }

            _route.description = description;


            var _success = await _route.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(200).json(_route);
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

            const _route = await Route.findByPk(id);

            if (!_route) {
                throw new ErrorHandler(404, `Rota ${id} não encontrada.`);
            }

            var _success = await _route.destroy().then(() => {
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
    async storeLesson(req, res, next) {
        try {
            var { id } = req.params;
            var { lesson_ids } = req.body;
            if (!id || !lesson_ids) {
                throw new ErrorHandler(400, null);
            }

            const _route = await Route.findByPk(id, {
                include: [
                    {
                        association: 'lessons'
                    },
                ]
            });
            if (!_route) {
                throw new ErrorHandler(404, `Rota ${id} não encontrada.`);
            }
            var _lessons = [];

            for (var i in lesson_ids) {
                var _lesson = await Lesson.findByPk(lesson_ids[i]);
                if (!_lesson) {
                    throw new ErrorHandler(404, `Lição ${lesson_ids[i]} não encontrada.`);
                }

                _lessons.push(_lesson);
            }


            var _success = await _route.addLessons(_lessons).then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(201).json(await _route.reload());
        } catch (err) {
            next(err);
        }
    },
    async updateLesson(req, res, next) {
        try {
            var { id } = req.params;
            var { lesson_ids } = req.body;
            if (!id || !lesson_ids) {
                throw new ErrorHandler(400, null);
            }

            const _route = await Route.findByPk(id, {
                include: [
                    {
                        association: 'lessons'
                    },
                ]
            });
            if (!_route) {
                throw new ErrorHandler(404, `Rota ${id} não encontrada.`);
            }
            var _lessons = [];

            for (var i in lesson_ids) {
                var _lesson = await Lesson.findByPk(lesson_ids[i]);
                if (!_lesson) {
                    throw new ErrorHandler(404, `Lição ${lesson_ids[i]} não encontrada.`);
                }

                _lessons.push(_lesson);
            }


            var _success = await _route.setLessons(_lessons).then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(201).json(await _route.reload());
        } catch (err) {
            next(err);
        }
    },
    async deleteLesson(req, res, next) {
        try {
            var { id } = req.params;
            var { lesson_ids } = req.body;
            if (!id || !lesson_ids) {
                throw new ErrorHandler(400, null);
            }

            const _route = await Route.findByPk(id, {
                include: [
                    {
                        association: 'lessons'
                    },
                ]
            });

            if (!_route) {
                throw new ErrorHandler(404, `Rota ${id} não encontrada.`);
            }
            var _lessons = [];

            for (var i in lesson_ids) {
                var _lesson = await Lesson.findByPk(lesson_ids[i]);
                if (!_lesson) {
                    throw new ErrorHandler(404, `Lição ${lesson_id} não encontrada.`);
                }

                _lessons.push(_lesson);
            }


            var _success = await _route.removeLessons(_lessons).then(() => {
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