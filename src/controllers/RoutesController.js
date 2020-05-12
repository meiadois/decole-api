const database = require('../models');
const Lesson = database.Lesson;
const Route = database.Route;
const Channel = database.Channel;

const Step = database.Step;
const DoneLesson = database.DoneLesson;

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
                    {
                        association: 'channels'
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
                        {
                            association: 'channels'
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
            var { title, description } = req.body;
            if (!description || !title) {
                throw new ErrorHandler(400, null);
            }
            const nResults = await Route.count({
                where: { description }
            });

            if (nResults != 0) {
                throw new ErrorHandler(400, `Já existe uma rota com a descrição [${description}].`);
            }
            const [_route] = await Route.findOrCreate({
                where: { title, description }
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
            var { title, description } = req.body;
            if (!description || !title) {
                throw new ErrorHandler(400, null);
            }

            const _route = await Route.findByPk(id);

            if (!_route) {
                throw new ErrorHandler(404, `Rota ${id} não encontrada.`);
            }

            _route.description = description;
            _route.title = title;

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
    async meListWithProgress(req, res, next) {
        try {
            var user_id = res.locals.user.id;

            var _routes = await Route.findAll({
                include: [
                    {
                        association: 'lessons',
                        through: { attributes: [] }
                    },
                ],
            });
            var infos = []
            for (let y = 0; y < _routes.length; y++) {
                let lessons = _routes[y].lessons
                console.log(` lessons.length: ${lessons.length}`);
                let n_done_lessons = 0

                for (let i = 0; i < lessons.length; i++) {
                    let n = await DoneLesson.count({ where: { user_id, 'lesson_id': lessons[i].id } });
                    lessons[i].dataValues['done'] = n != 0 // is true if is done
                    if (lessons[i].dataValues['done'] == true) n_done_lessons++;
                }

                percentage = n_done_lessons === 0 ? 0 : Math.floor((n_done_lessons * 100) / lessons.length);

                infos.push({
                    'id': _routes[y].id,
                    'title': _routes[y].title,
                    'description': _routes[y].description,
                    'progress': {
                        'done': n_done_lessons,
                        'total': lessons.length,
                        'remain': lessons.length - n_done_lessons,
                        "percentage": percentage
                    }
                })
            }


            return res.status(200).json(
                infos
            );
        } catch (err) {
            next(err);
        }

    },
    async meSimpleListWithProgress(req, res, next) {
        try {
            var user_id = res.locals.user.id;

            var _routes = await Route.findAll({
                include: [
                    {
                        association: 'lessons',
                        through: { attributes: [] }
                    },
                ],
            });
            var infos = []
            for (let y = 0; y < _routes.length; y++) {
                let lessons = _routes[y].lessons
                let n_done_lessons = 0

                for (let i = 0; i < lessons.length; i++) {
                    let n = await DoneLesson.count({ where: { user_id, 'lesson_id': lessons[i].id } });
                    if (n != 0) n_done_lessons++;
                }

                percentage = n_done_lessons === 0 ? 0 : Math.floor((n_done_lessons * 100) / lessons.length);

                infos.push({
                    'id': _routes[y].id,
                    'title': _routes[y].title,
                    'title': _routes[y].title,
                    'description': _routes[y].description,
                    'createdAt': _routes[y].createdAt,
                    'updatedAt': _routes[y].updatedAt,
                    'progress': {
                        'done': n_done_lessons,
                        'total': lessons.length,
                        'remain': lessons.length - n_done_lessons,
                        "percentage": percentage
                    }
                })
            }


            return res.status(200).json(
                infos
            );
        } catch (err) {
            next(err);
        }

    },
    async meIndexWithProgress(req, res, next) {
        try {
            var { id } = req.params;
            var user_id = res.locals.user.id;

            var _route = await Route.findByPk(id, {
                include: [
                    {
                        association: 'lessons',
                        through: { attributes: [] }
                    },
                ],
            });
            var lessons = _route.lessons
            var n_done_lessons = 0

            for (let i = 0; i < lessons.length; i++) {
                let n = await DoneLesson.count({ where: { user_id, 'lesson_id': lessons[i].id } });
                lessons[i].dataValues['done'] = n != 0 // is true if is done
                if (n != 0) n_done_lessons++;
            }
            return res.status(200).json({
                'id': _route.id,
                'title': _route.title,
                'description': _route.description,
                'lessons': lessons,
                'progress': {
                    'done': n_done_lessons,
                    'total': lessons.length,
                    'remain': lessons.length - n_done_lessons,
                    "percentage": Math.floor((((n_done_lessons) / lessons.length) * 100))
                }
            });
        } catch (err) {
            next(err);
        }

    },
    async meSimpleIndexWithProgress(req, res, next) {
        try {
            var { id } = req.params;
            var user_id = res.locals.user.id;

            var _route = await Route.findByPk(id, {
                include: [
                    {
                        association: 'lessons',
                        through: { attributes: [] }
                    },
                ],
            });
            var lessons = _route.lessons
            var n_done_lessons = 0

            for (let i = 0; i < lessons.length; i++) {
                let n = await DoneLesson.count({ where: { user_id, 'lesson_id': lessons[i].id } });
                if (lessons[i].dataValues['done'] == true) n_done_lessons++;
            }
            return res.status(200).json({
                'id': _route.id,
                'title': _route.title,
                'title': _route.title,
                'description': _route.description,
                'createdAt': _route.createdAt,
                'updatedAt': _route.updatedAt,
                'progress': {
                    'done': n_done_lessons,
                    'total': lessons.length,
                    'remain': lessons.length - n_done_lessons,
                    "percentage": Math.floor((((n_done_lessons) / lessons.length) * 100))
                }
            });
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
                    throw new ErrorHandler(404, `Lição ${lesson_ids[i]} não encontrada.`);
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
    async storeChannel(req, res, next) {
        try {
            var { id } = req.params;
            var { channel_ids } = req.body;
            if (!id || !channel_ids) {
                throw new ErrorHandler(400, null);
            }

            const _route = await Route.findByPk(id, {
                include: [
                    {
                        association: 'channels'
                    },
                ]
            });
            if (!_route) {
                throw new ErrorHandler(404, `Rota ${id} não encontrada.`);
            }
            var _channels = [];

            for (var i in channel_ids) {
                var _channel = await Channel.findByPk(channel_ids[i]);
                if (!_channel) {
                    throw new ErrorHandler(404, `Lição ${channel_ids[i]} não encontrada.`);
                }

                _channels.push(_channel);
            }

            var _success = await _route.addChannels(_channels).then(() => {
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
    async updateChannel(req, res, next) {
        try {
            var { id } = req.params;
            var { channel_ids } = req.body;
            if (!id || !channel_ids) {
                throw new ErrorHandler(400, null);
            }

            const _route = await Route.findByPk(id, {
                include: [
                    {
                        association: 'lessons'
                    },
                    {
                        association: 'channels'
                    },
                ]
            });
            if (!_route) {
                throw new ErrorHandler(404, `Rota ${id} não encontrada.`);
            }
            var _channels = [];

            for (var i in channel_ids) {
                var _channel = await Channel.findByPk(channel_ids[i]);
                if (!_channel) {
                    throw new ErrorHandler(404, `Lição ${channel_ids[i]} não encontrada.`);
                }

                _channels.push(_channel);
            }


            var _success = await _route.setChannels(_channels).then(() => {
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
    async deleteChannel(req, res, next) {
        try {
            var { id } = req.params;
            var { channel_ids } = req.body;
            if (!id || !channel_ids) {
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
            var _channels = [];

            for (var i in channel_ids) {
                var _channel = await Lesson.findByPk(channel_ids[i]);
                if (!_channel) {
                    throw new ErrorHandler(404, `Lição ${channel_ids[i]} não encontrada.`);
                }

                _channels.push(_channel);
            }

            var _success = await _route.removeChannels(_channels).then(() => {
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