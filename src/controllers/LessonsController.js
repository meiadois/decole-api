const database = require('../models');
const Lesson = database.Lesson;
const Route = database.Route;
const Step = database.Step;

const { ErrorHandler } = require('../helpers/error');

module.exports = {
    async list(req, res, next) {
        try {
            const _lessons = await Lesson.findAll({
                include: [
                    {
                        association: 'steps'
                    },
                    {
                        association: 'requirements'
                    },
                ]
            });
            res.json(_lessons);
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
            var _lesson = await Lesson.findByPk(id, {
                include: [
                    {
                        association: 'steps'
                    },
                    {
                        association: 'requirements'
                    },
                ]
            });

            if (_lesson === null) {
                throw new ErrorHandler(404, `Lição ${id} não encontrada.`);
            }
            return res.status(200).json(_lesson);
        } catch (err) {
            next(err);
        }

    },
    async store(req, res, next) {
        try {
            var { title, description } = req.body;
            if (!title || !description) {
                throw new ErrorHandler(400, null);
            }

            const [_lesson] = await Lesson.findOrCreate({
                where: { title, description }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_lesson) {
                throw new ErrorHandler(500, null);
            }

            return res.status(201).json(_lesson);
        } catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            var { id } = req.params;
            var { title, description } = req.body;
            if (!title || !description) {
                throw new ErrorHandler(400, null);
            }

            const _lesson = await Lesson.findByPk(id);

            if (!_lesson) {
                throw new ErrorHandler(404, `Lição ${id} não encontrada.`);
            }

            _lesson.title = title;
            _lesson.description = description;


            var _success = await _lesson.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(200).json(_lesson);
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

            const _lesson = await Lesson.findByPk(id);

            if (!_lesson) {
                throw new ErrorHandler(404, `Lição ${id} não encontrada.`);
            }

            var _success = await _lesson.destroy().then(() => {
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