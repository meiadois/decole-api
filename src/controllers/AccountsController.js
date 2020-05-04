const database = require('../models');
const Channel = database.Channel;
const Account = database.Account;
const User = database.User;

const { ErrorHandler } = require('../helpers/error');

module.exports = {
    async list(req, res, next) {
        try {
            const _account = await Account.findAll({
                include: [
                    {
                        association: 'user'
                    },
                    {
                        association: 'channel'
                    },
                ]
            });
            res.json(_account);
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
            var _account = await Account.findByPk(id, {
                include: [
                    {
                        association: 'user'
                    },
                    {
                        association: 'channel'
                    },
                ]
            });

            if (_account === null) {
                throw new ErrorHandler(404, `Conta ${id} não encontrada.`);
            }
            return res.status(200).json(_account);
        } catch (err) {
            next(err);
        }

    },
    async store(req, res, next) {
        try {
            var { user_id, username, channel_name } = req.body;
            if (!user_id || !username || !channel_name) {
                throw new ErrorHandler(400, null);
            }

            const _channel = await Channel.findOne({
                where: {
                    'name': channel_name
                }
            });

            const nResults = await Account.count({ where: { user_id, 'channel_id': _channel.id } });

            if (nResults != 0) {
                throw new ErrorHandler(400, `Já existe uma conta do usuário [${user_id}] no canal ${channel_name}.`);
            }

            if (!_channel) {
                throw new ErrorHandler(404, `Canal ${channel_name} não encontrada.`);
            }

            const _user = await User.findByPk(user_id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`);
            }

            const [_account] = await Account.findOrCreate({
                where: { user_id, username, 'channel_id': _channel.id }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_account) {
                throw new ErrorHandler(500, null);
            }

            return res.status(201).json(_account);
        } catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            var { id } = req.params;
            var { user_id, username, channel_name } = req.body;
            if (!id || !user_id || !username || !channel_name) {
                throw new ErrorHandler(400, null);
            }

            var _account = await Account.findByPk(id, {
                include: [
                    {
                        association: 'user'
                    },
                    {
                        association: 'channel'
                    },
                ]
            });

            if (_account === null) {
                throw new ErrorHandler(404, `Conta ${id} não encontrada.`);
            }

            const _channel = await Channel.findOne({
                where: {
                    'name': channel_name
                }
            });

            if (!_channel) {
                throw new ErrorHandler(404, `Canal ${channel_name} não encontrada.`);
            }

            const _user = await User.findByPk(user_id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`);
            }

            _account.user_id = user_id;
            _account.channel_id = _channel.id;
            _account.username = username;

            var _success = await _account.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(200).json(await _account.reload());
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

            const _account = await Account.findByPk(id);

            if (!_account) {
                throw new ErrorHandler(404, `Conta ${id} não encontrada.`);
            }

            var _success = await _account.destroy().then(() => {
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
            const _account = await Account.findAll({
                where: {
                    'user_id': id,
                },
                include: [
                    {
                        association: 'channel'
                    },
                ]
            });
            res.json(_account);
        } catch (err) {
            next(err);
        }
    },
    async meIndex(req, res, next) {
        try {
            var user_id = res.locals.user.id;
            var { channel_name } = req.params;
            const _channel = await Channel.findOne({
                where: {
                    'name': channel_name
                }
            });

            if (!_channel) {
                throw new ErrorHandler(404, `Canal ${channel_name} não encontrada.`);
            }

            const _account = await Account.findOne({
                where: {
                    user_id,
                    'channel_id': _channel.id
                },
                include: [
                    {
                        association: 'channel'
                    },
                ]
            });
            res.json(_account);
        } catch (err) {
            next(err);
        }
    },
    async meStore(req, res, next) {
        try {
            var user_id = res.locals.user.id;
            var { username, channel_name } = req.body;
            if (!user_id || !username || !channel_name) {
                throw new ErrorHandler(400, null);
            }
            const _channel = await Channel.findOne({
                where: {
                    'name': channel_name
                }
            });

            const nResults = await Account.count({ where: { user_id, 'channel_id': _channel.id } });

            if (nResults != 0) {
                throw new ErrorHandler(400, `Já existe uma conta do usuário [${user_id}] no canal ${channel_name}.`);
            }

            if (!_channel) {
                throw new ErrorHandler(404, `Canal ${channel_name} não encontrada.`);
            }

            const _user = await User.findByPk(user_id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`);
            }

            const [_account] = await Account.findOrCreate({
                where: { user_id, username, 'channel_id': _channel.id }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_account) {
                throw new ErrorHandler(500, null);
            }

            return res.status(201).json(_account);
        } catch (err) {
            next(err);
        }
    },
    async meUpdate(req, res, next) {
        try {
            var user_id = res.locals.user.id;
            var { channel_name } = req.params;
            var { username } = req.body;
            if (!user_id || !username || !channel_name) {
                throw new ErrorHandler(400, null);
            }



            if (_account === null) {
                throw new ErrorHandler(404, `Conta ${id} não encontrada.`);
            }

            const _channel = await Channel.findOne({
                where: {
                    'name': channel_name
                }
            });

            if (!_channel) {
                throw new ErrorHandler(404, `Canal ${channel_name} não encontrada.`);
            }
            var _account = await Account.findOne({
                where: {
                    user_id,
                    'channel_id': _channel.id
                },
                include: [
                    {
                        association: 'user'
                    },
                    {
                        association: 'channel'
                    },
                ]
            });

            const _user = await User.findByPk(user_id);

            if (!_user) {
                throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`);
            }

            _account.user_id = user_id;
            _account.channel_id = _channel.id;
            _account.username = username;

            var _success = await _account.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }
            return res.status(200).json(await _account.reload());
        } catch (err) {
            next(err);
        }
    },
    async meDelete(req, res, next) {
        try {
            var user_id = res.locals.user.id;
            var { channel_name } = req.params;

            const _channel = await Channel.findOne({
                where: {
                    'name': channel_name
                }
            });

            if (!_channel) {
                throw new ErrorHandler(404, `Canal ${channel_name} não encontrada.`);
            }

            const _account = await Account.findOne({
                where: {
                    user_id,
                    'channel_id': _channel.id
                },
                include: [
                    {
                        association: 'channel'
                    },
                ]
            });
            var _success = await _account.destroy().then(() => {
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