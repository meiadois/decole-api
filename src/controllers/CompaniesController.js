const database = require('../models');
const Lesson = database.Lesson;
const Company = database.Company;
const Step = database.Step;

const { ErrorHandler } = require('../helpers/error');

module.exports = {
    async list(req, res, next) {
        try {
            const _company = await Company.findAll({
                include: [
                    {
                        association: 'likes'
                    },
                    {
                        association: 'users'
                    },
                ]
            });
            res.json(_company);
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
                _user = await Company.findByPk(id, {
                    include: [
                        {
                            association: 'likes'
                        },
                        {
                            association: 'users'
                        }
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
            var { name, cep, thumbnail, cnpj, segment_id } = req.body;
            if (!name || !cep || !thumbnail || !cnpj || !segment_id) {
                throw new ErrorHandler(400, null);
            }

            const [_user] = await Company.findOrCreate({
                where: { name, cep, thumbnail, cnpj, segment_id }
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
            var { name, cep, thumbnail, cnpj, segment_id } = req.body;
            if (!name || !cep || !thumbnail || !cnpj || !segment_id) {
                throw new ErrorHandler(400, null);
            }

            const _user = await Company.findByPk(id);

            if (!_user) {
                throw new ErrorHandler(404, null);
            }

            _user.name = name;
            _user.cep = cep;
            _user.thumbnail = thumbnail;
            _user.cnpj = cnpj;
            _user.segment_id = segment_id;


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

            const _user = await Company.findByPk(id);

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
    /*
    async storeLesson(req, res, next) {
        try {
            var { id } = req.params;
            var { lesson_ids } = req.body;
            if (!id || !lesson_ids) {
                throw new ErrorHandler(400, null);
            }

            const _user = await Company.findByPk(id, {
                include: [
                    {
                        association: 'lessons'
                    },
                ]
            });
            console.log("ROUTE: " + _user);
            if (!_user) {
                throw new ErrorHandler(404, "Rota não encontrada");
            }
            var _lessons = [];

            for (var i in lesson_ids) {
                var _lesson = await Lesson.findByPk(lesson_ids[i]);
                if (!_lesson) {
                    throw new ErrorHandler(404, `Lição ${lesson_id} não encontrada.`);
                }

                _lessons.push(_lesson);
            }


            var _success = await _user.addLessons(_lessons).then(() => {
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
    async updateLesson(req, res, next) {
        try {
            var { id } = req.params;
            var { lesson_ids } = req.body;
            if (!id || !lesson_ids) {
                throw new ErrorHandler(400, null);
            }

            const _user = await Company.findByPk(id, {
                include: [
                    {
                        association: 'lessons'
                    },
                ]
            });
            console.log("ROUTE: " + _user);
            if (!_user) {
                throw new ErrorHandler(404, "Rota não encontrada");
            }
            var _lessons = [];

            for (var i in lesson_ids) {
                var _lesson = await Lesson.findByPk(lesson_ids[i]);
                if (!_lesson) {
                    throw new ErrorHandler(404, `Lição ${lesson_id} não encontrada.`);
                }

                _lessons.push(_lesson);
            }


            var _success = await _user.setLessons(_lessons).then((l) => {
                console.log(l)
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
    async deleteLesson(req, res, next) {
        try {
            var { id } = req.params;
            var { lesson_ids } = req.body;
            if (!id || !lesson_ids) {
                throw new ErrorHandler(400, null);
            }

            const _user = await Company.findByPk(id, {
                include: [
                    {
                        association: 'lessons'
                    },
                ]
            });
            console.log("ROUTE: " + _user);
            if (!_user) {
                throw new ErrorHandler(404, "Rota não encontrada");
            }
            var _lessons = [];

            for (var i in lesson_ids) {
                var _lesson = await Lesson.findByPk(lesson_ids[i]);
                if (!_lesson) {
                    throw new ErrorHandler(404, `Lição ${lesson_id} não encontrada.`);
                }

                _lessons.push(_lesson);
            }


            var _success = await _user.removeLessons(_lessons).then(() => {
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
    },*/


};