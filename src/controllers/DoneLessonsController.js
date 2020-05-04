const database = require('../models');
const Lesson = database.Lesson;
const DoneLesson = database.DoneLesson;
const User = database.User;

const { ErrorHandler } = require('../helpers/error');

module.exports = {
    async list(req, res, next) {
        try {
            const _done_lesson = await DoneLesson.findAll({
                include: [
                    {
                        association: 'user'
                    },
                    {
                        association: 'lesson'
                    },
                ]
            });
            res.json(_done_lesson);
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
            var _done_lesson = await DoneLesson.findByPk(id, {
                include: [
                    {
                        association: 'user'
                    },
                    {
                        association: 'lesson'
                    },
                ]
            });

            if (_done_lesson === null) {
                throw new ErrorHandler(404, `Lição Concluida ${id} não encontrada.`);
            }
            return res.status(200).json(_done_lesson);
        } catch (err) {
            next(err);
        }

    },
    async store(req, res, next) {
        try {
            var { user_id, lesson_id } = req.body;
            if (!user_id || !lesson_id) {
                throw new ErrorHandler(400, null);
            }

            const _lesson = await Lesson.findByPk(lesson_id);

            if (!_lesson) {
                throw new ErrorHandler(404, `Lição ${lesson_id} não encontrada.`);
            }

            const _user = await User.findByPk(user_id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`);
            }

            const [_done_lesson] = await DoneLesson.findOrCreate({
                where: { user_id, lesson_id }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_done_lesson) {
                throw new ErrorHandler(500, null);
            }

            return res.status(201).json(_done_lesson);
        } catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            var { id } = req.params;
            var { user_id, lesson_id } = req.body;
            if (!user_id || !lesson_id) {
                throw new ErrorHandler(400, null);
            }

            const _done_lesson = await DoneLesson.findByPk(id);

            if (!_done_lesson) {
                throw new ErrorHandler(404, `Lição Concluida ${id} não encontrada.`);
            }

            const _lesson = await Lesson.findByPk(lesson_id);

            if (!_lesson) {
                throw new ErrorHandler(404, `Lição ${lesson_id} não encontrada.`);
            }

            const _user = await User.findByPk(user_id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`);
            }

            _done_lesson.user_id = user_id;
            _done_lesson.lesson_id = lesson_id;

            var _success = await _done_lesson.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(200).json(await _done_lesson.reload());
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

            const _done_lesson = await DoneLesson.findByPk(id);

            if (!_done_lesson) {
                throw new ErrorHandler(404, `Lição Concluida ${id} não encontrada.`);
            }

            var _success = await _done_lesson.destroy().then(() => {
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
    async meList(req, res, next) {
        try {
            var { id } = res.locals.user;
            const _done_lesson = await DoneLesson.findAll({
                where: {
                    'user_id': id,
                },
                include: [
                    {
                        association: 'lesson'
                    },
                ]
            });
            res.json(_done_lesson);
        } catch (err) {
            next(err);
        }
    },
    async meStore(req, res, next) {
        try {
            var { lesson_id } = req.body;
            var { id } = res.locals.user;
            if (!id || !lesson_id) {
                throw new ErrorHandler(400, null);
            }

            const nResults = await Lesson.count({ where: { 'user_id': id, lesson_id } });

            if (nResults != 0) {
                throw new ErrorHandler(400, `A lição [${lesson_id}] já foi concluida pelo usuário [${id}].`);
            }

            const _lesson = await Lesson.findByPk(lesson_id);

            if (!_lesson) {
                throw new ErrorHandler(404, `Lição ${lesson_id} não encontrada.`);
            }

            const _user = await User.findByPk(id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuário ${id} não encontrado.`);
            }

            const [_done_lesson] = await DoneLesson.findOrCreate({
                where: { 'user_id': id, lesson_id }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_done_lesson) {
                throw new ErrorHandler(500, null);
            }

            return res.status(201).json(_done_lesson);
        } catch (err) {
            next(err);
        }
    },
};