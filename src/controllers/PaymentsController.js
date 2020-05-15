const database = require('../models')
const Payment = database.Payment
const User = database.User
const moment = require('moment');

const { ErrorHandler } = require('../helpers/error');

const PAYMENT_STATUS = ['confirmed', 'pending', 'denied', 'refunded']
function is_valid_payment_status(status) {
    return PAYMENT_STATUS.indexOf(status) >= 0
}

const PAYMENT_TYPES = ['access']
function is_valid_payment_type(status) {
    return PAYMENT_TYPES.indexOf(status) >= 0
}
module.exports = {
    async list(req, res, next) {
        try {
            const _payments = await Payment.findAll();
            res.json(_payments);
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
            var _payment = await Payment.findByPk(id, {
                include: [
                    {
                        association: 'user'
                    },
                ]
            });

            if (_payment === null) {
                throw new ErrorHandler(404, `Pagamento ${id} não encontrado.`);
            }
            return res.status(200).json(_payment);
        } catch (err) {
            next(err);
        }

    },
    async store(req, res, next) {
        try {
            var now = moment();

            var { price, description, value, date, type, status, user_id } = req.body;

            if (!price || !description || !value || !date || !type || !status || !user_id) {
                throw new ErrorHandler(400, null);
            }

            const _user = await User.findByPk(user_id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuario ${user_id} não encontrado.`);
            }

            if (status != null) {
                if (!is_valid_payment_status(status)) {
                    throw new ErrorHandler(400, `[${status}] não é um status válido. Estes são os status possíveis: [${PAYMENT_STATUS.toString()}]`);
                }
            }
            if (type != null) {
                if (!is_valid_payment_type(type)) {
                    throw new ErrorHandler(400, `[${type}] não é um tipo válido. Estes são os status possíveis: [${PAYMENT_TYPES.toString()}]`);
                }
            }
            const [_payment] = await Payment.findOrCreate({
                where: { price, description, value, date, type, status, user_id }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_payment) {
                throw new ErrorHandler(500, null);
            }

            if (type == 'access') {
                if (_user.paid_access_expiration == null) _user.paid_access_expiration = now;
                var moment_paid_access_expiration = moment(_user.paid_access_expiration);

                if (moment_paid_access_expiration.isAfter(now)) {
                    _user.paid_access_expiration = moment_paid_access_expiration.add((value + 1), 'days');
                } else {
                    _user.paid_access_expiration = now.add((value + 1), 'days');
                }

                var _success = await _user.save().then(() => {
                    return true;
                }).catch((err) => {
                    console.log(err);
                    return false;
                });

                if (!_success) {
                    throw new ErrorHandler(500, null);
                }
            }

            return res.status(201).json(_payment);
        } catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            var { id } = req.params;
            var { price, description, value, date, type, status, user_id } = req.body;

            if (!price || !description || !value || !date || !type || !status || !user_id) {
                throw new ErrorHandler(400, null);
            }

            const _user = await User.findByPk(user_id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuario ${user_id} não encontrado.`);
            }

            const _payment = await Payment.findByPk(id);

            if (!_payment) {
                throw new ErrorHandler(404, `Etapa ${id} não encontrada.`);
            }

            _payment.price = price;
            _payment.description = description;
            _payment.value = value;
            _payment.date = date;
            _payment.type = type;
            _payment.status = status;
            _payment.user_id = user_id;


            var _success = await _payment.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(200).json(_payment);
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

            const _payment = await Payment.findByPk(id);

            if (!_payment) {
                throw new ErrorHandler(404, `Pagamento ${id} não encontrada.`);
            }

            var _success = await _payment.destroy().then(() => {
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
            var user_id = res.locals.user.id;
            const _payments = await Payment.findAll({
                where: { user_id }
            });
            res.json(_payments);
        } catch (err) {
            next(err);
        }
    },
    async meIndex(req, res, next) {
        try {
            var { id } = req.params;

            if (!id) {
                throw new ErrorHandler(404, null);
            }
            var user_id = res.locals.user.id;
            const _payment = await Payment.findOne({
                where: { id, user_id },
                include: [
                    {
                        association: 'user'
                    },
                ]
            });

            if (_payment === null) {
                throw new ErrorHandler(404, `Pagamento ${id} do usuário ${user_id} não encontrada.`);
            }
            return res.status(200).json(_payment);
        } catch (err) {
            next(err);
        }

    },
    async meStore(req, res, next) {
        try {
            var user_id = res.locals.user.id;

            var now = moment();

            var { price, description, value, date, type, status } = req.body;


            if (!price || !description || !value || !date || !type || !status || !user_id) {
                throw new ErrorHandler(400, null);
            }

            const _user = await User.findByPk(user_id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuario ${user_id} não encontrado.`);
            }

            if (status != null) {
                if (!is_valid_payment_status(status)) {
                    throw new ErrorHandler(400, `[${status}] não é um status válido. Estes são os status possíveis: [${PAYMENT_STATUS.toString()}]`);
                }
            }
            if (type != null) {
                if (!is_valid_payment_type(type)) {
                    throw new ErrorHandler(400, `[${type}] não é um tipo válido. Estes são os status possíveis: [${PAYMENT_TYPES.toString()}]`);
                }
            }
            const [_payment] = await Payment.findOrCreate({
                where: { price, description, value, date, type, status, user_id }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_payment) {
                throw new ErrorHandler(500, null);
            }

            if (type == 'access') {
                if (_user.paid_access_expiration == null) _user.paid_access_expiration = now;
                var moment_paid_access_expiration = moment(_user.paid_access_expiration);

                if (moment_paid_access_expiration.isAfter(now)) {
                    _user.paid_access_expiration = moment_paid_access_expiration.add((value + 1), 'days');
                } else {
                    _user.paid_access_expiration = now.add((value + 1), 'days');
                }

                var _success = await _user.save().then(() => {
                    return true;
                }).catch((err) => {
                    console.log(err);
                    return false;
                });

                if (!_success) {
                    throw new ErrorHandler(500, null);
                }
            }

            return res.status(201).json(_payment);
        } catch (err) {
            next(err);
        }
    },
    async meUpdate(req, res, next) {
        try {
            var user_id = res.locals.user.id;
            var { id } = req.params;
            var { price, description, value, date, type, status } = req.body;

            if (!price || !description || !value || !date || !type || !status || !user_id) {
                throw new ErrorHandler(400, null);
            }

            const _user = await User.findByPk(user_id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuario ${user_id} não encontrado.`);
            }

            const _payment = await Payment.findOne({
                where: { id, user_id }
            });

            if (!_payment) {
                throw new ErrorHandler(404, `Pagamento ${id} do usuário ${user_id} não encontrada.`);
            }

            _payment.price = price;
            _payment.description = description;
            _payment.value = value;
            _payment.date = date;
            _payment.type = type;
            _payment.status = status;
            _payment.user_id = user_id;


            var _success = await _payment.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(200).json(_payment);
        } catch (err) {
            next(err);
        }
    },
    async meDelete(req, res, next) {
        try {
            var { id } = req.params;
            var user_id = res.locals.user.id;

            if (!id) {
                throw new ErrorHandler(400, null);
            }

            const _payment = await Payment.findOne({
                where: { id, user_id }
            });

            if (!_payment) {
                throw new ErrorHandler(404, `Pagamento ${id} do usuário ${user_id} não encontrada.`);
            }

            var _success = await _payment.destroy().then(() => {
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