const database = require('../models')
const Step = database.Step
const { ErrorHandler } = require('../helpers/error');

module.exports = {
    async list(req, res, next) {
        try {
            const _steps = await Step.findAll();
            res.json(_steps);
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
            var _step = await Step.findByPk(id);

            if (_step === null) {
                throw new ErrorHandler(404, `Etapa ${id} não encontrada.`);
            }
            return res.status(200).json(_step);
        } catch (err) {
            next(err);
        }

    },
    async store(req, res, next) {
        try {
            var { message, order, lesson_id } = req.body;
            if (!message || !order || !lesson_id) {
                throw new ErrorHandler(400, null);
            }
            const nResults = await Step.count({
                where: { message, lesson_id }
            });

            if (nResults != 0) {
                throw new ErrorHandler(400, `Já existe uma etapa com a mensagem [${message}] na lição [${lesson_id}].`);
            }
            const [_step] = await Step.findOrCreate({
                where: { message, order, lesson_id }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_step) {
                throw new ErrorHandler(500, null);
            }
            return res.status(201).json(_step);
        } catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            var { id } = req.params;
            var { message, order } = req.body;

            if (!id || !message || !order) {
                throw new ErrorHandler(400, null);
            }

            const _step = await Step.findByPk(id);

            if (!_step) {
                throw new ErrorHandler(404, `Etapa ${id} não encontrada.`);
            }

            _step.message = message;
            _step.order = order;


            var _success = await _step.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(200).json(_step);
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

            const _step = await Step.findByPk(id);

            if (!_step) {
                throw new ErrorHandler(404, `Etapa ${id} não encontrada.`);
            }

            var _success = await _step.destroy().then(() => {
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