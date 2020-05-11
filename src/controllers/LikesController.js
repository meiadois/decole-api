const database = require('../models')
const Like = database.Like
const Company = database.Company
const User = database.User

const { ErrorHandler } = require('../helpers/error');

module.exports = {
    async list(req, res, next) {
        try {
            var { status, sender_company, recipient_company } = req.query;
            let where = {}
            if (status != undefined) {
                where['status'] = status
            }
            if (sender_company != undefined) {
                where['sender_company'] = sender_company
            }
            if (recipient_company != undefined) {
                where['recipient_company'] = recipient_company
            }

            const _likes = await Like.findAll({
                where,
                include: [
                    {
                        association: 'sender_company'
                    },
                    {
                        association: 'recipient_company'
                    },
                ]
            });
            res.json(_likes);
        } catch (err) {
            next(err);
        }
    },
    async index(req, res, next) {
        try {

            var { id } = req.params;
            let where = {}
            if (!id) {
                throw new ErrorHandler(404, null);
            }
            var _like = null;
            try {
                _like = await Like.findByPk(id, {
                    where,
                    include: [
                        {
                            association: 'sender_company'
                        },
                        {
                            association: 'recipient_company'
                        },
                    ]
                });
            } catch (err) {
                console.log(err)
            }

            if (_like === null) {
                throw new ErrorHandler(404, `Canal ${id} não encontrado.`);
            }
            return res.status(200).json(_like);
        } catch (err) {
            next(err);
        }

    },
    async store(req, res, next) {
        try {
            var { sender_id, recipient_id } = req.body;
            if (!sender_id || !recipient_id) {
                throw new ErrorHandler(400, null);
            }

            const nResults = await Like.count({ where: { sender_id, recipient_id } });

            if (nResults != 0) {
                throw new ErrorHandler(400, `Já existe um like entre as empresas [${sender_id}] e [${recipient_id}].`);
            }

            const [_like] = await Like.findOrCreate({
                where: { sender_id, recipient_id }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_like) {
                throw new ErrorHandler(500, null);
            }
            return res.status(201).json(_like);
        } catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            var { id } = req.params;
            var { sender_id, recipient_id, status = null } = req.body;
            if (!sender_id || !recipient_id) {
                throw new ErrorHandler(400, null);
            }

            const nResultsSender = await Company.count({ where: { id: sender_id } });

            if (nResultsSender == 0) {
                throw new ErrorHandler(400, `Não existe uma empresa com o id [${sender_id}].`);
            }

            const nResultsRecipient = await Company.count({ where: { id: recipient_id } });

            if (nResultsRecipient == 0) {
                throw new ErrorHandler(400, `Não existe uma empresa com o id [${recipient_id}].`);
            }

            const _like = await Like.findByPk(id);

            if (!_like) {
                throw new ErrorHandler(404, `Like ${id} não encontrado.`);
            }

            _like.sender_id = sender_id;
            _like.recipient_id = recipient_id;
            if (status !== null) {
                _like.status = status
            }


            var _success = await _like.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(200).json(_like);
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

            const _like = await Like.findByPk(id);

            if (!_like) {
                throw new ErrorHandler(404, `Like ${id} não encontrado.`);
            }

            var _success = await _like.destroy().then(() => {
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