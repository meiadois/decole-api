const database = require('../models');
const User = database.User;
const ResetPassword = database.ResetPassword;

const LoginService = require('../services/login-service');
const AuthService = require('../services/auth-service');
const NodeMailer = require('../services/NodeMailer');

const Logger = require('../services/Logger');
const crypto = require('crypto');
const moment = require('moment');


const { ErrorHandler } = require('../helpers/error');

function isEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = {
    async login(req, res, next) {
        try {
            var now = moment();

            var { email, password } = req.body;

            if (!isEmail(email)) {
                throw new ErrorHandler(400, `[${email}] não é um email válido.`);
            }

            const _user = await User.findOne({ where: { email } });

            if (_user === null) {
                throw new ErrorHandler(404, `Não há usuários com o email ${email}.`);
            }

            var success = await LoginService.login(_user.password, password);
            if (!success) {
                throw new ErrorHandler(404, `Email ou Senha incorretos.`);
            }

            var token = await AuthService.generateToken({
                'user': {
                    'id': _user.id,
                    'email': _user.email,
                    'name': _user.name,
                    'paid_access': (moment(_user.paid_access_expiration).isAfter(now)),
                }
            });
            Logger.info(`Usuário ${_user.email} realizou o login com sucesso`, req);
            return res.status(200).json({
                'message': "Login realizado com sucesso",
                'user': {
                    'email': _user.email,
                    'name': _user.name,
                    'introduced': _user.introduced,
                    'paid_access': (moment(_user.paid_access_expiration).isAfter(now)),
                    token
                }

            });
        } catch (err) {
            next(err);
        }
    },
    async register(req, res, next) {
        try {
            var promotion_expiration_date = moment("2020-07-01");
            var now = moment();

            var paid_exp_date = moment();
            if (!now.isAfter(promotion_expiration_date)) {
                console.log("Promotion is valid")
                paid_exp_date = now.add(30, 'days');
            } else {
                console.log("Promotion is not valid")
            }

            var { name, email, password } = req.body;
            if (!name || !email || !password) {
                throw new ErrorHandler(400, null);
            }
            if (!isEmail(email)) {
                throw new ErrorHandler(400, `[${email}] não é um email válido.`);
            }
            const nResults = await User.count({ where: { email } });

            if (nResults != 0) {
                throw new ErrorHandler(400, `Email [${email}] já está sendo utilizado.`);
            }

            password = await LoginService.createHashedPassword(password);

            const [_user] = await User.findOrCreate({
                where: { name, email, password, paid_access_expiration: paid_exp_date }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_user) {
                throw new ErrorHandler(500, null);
            }
            await _user.reload()
            _user.password = null;

            var token = await AuthService.generateToken({
                'user': {
                    'id': _user.id,
                    'email': _user.email,
                    'name': _user.name,
                    'paid_access': paid_exp_date.isAfter(now)
                }
            });
            Logger.info(`Usuário ${_user.email} cadastrado com sucesso com sucesso`, req);
            return res.status(200).json({
                'message': "Login realizado com sucesso",
                'user': {
                    'email': _user.email,
                    'name': _user.name,
                    'introduced': _user.introduced,
                    'paid_access': paid_exp_date.isAfter(now),
                    token,
                }

            });
            //return res.status(201).json(_user);
        } catch (err) {
            next(err);
        }
    },
    async generate_reset_password(req, res, next) {
        try {
            const { email } = req.body;
            if (!isEmail(email)) {
                throw new ErrorHandler(400, `[${email}] não é um email válido.`);
            }
            const user_id = await User.findOne({ where: { email } }).then((user) => user.id);

            if (user_id == null) {
                console.log("b")
                throw new ErrorHandler(404, `Não há usuários com o email ${email}.`);
            }
            await ResetPassword.destroy({ where: { user_id } });

            const token = crypto.randomBytes(4).toString('hex');
            const expiresAt = moment().add(180, 'seconds')

            const reset_password = await ResetPassword.create({
                user_id,
                token,
                expiresAt
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!reset_password) {
                throw new ErrorHandler(500, null);
            }
            await NodeMailer.sendMail(email, "Esqueci minha senha", `O seu token de recuperação é ${token}`);
            Logger.info(`Usuário ${email} recebeu o código de recuperação de senha com sucesso.`, req);
            res.json({ token });
        } catch (err) {
            console.log(err)
            next(err);
        }
    },
    async forgot_password(req, res, next) {
        try {
            var { token, password } = req.body;
            const now = moment()

            const reset_password = await ResetPassword.findOne({ where: { token } });
            if (reset_password == null) {
                throw new ErrorHandler(404, `Não há reset_passwords com o token ${token}.`);
            }

            if (reset_password.expiresAt < now) {
                throw new ErrorHandler(400, `O token [${token}] já expirou.`);
            }

            const user = await User.findByPk(reset_password.user_id);

            if (user == null) {
                throw new ErrorHandler(404, `Não há usuários com o id ${reset_password.user_id}.`);
            }

            user.password = await LoginService.createHashedPassword(password);

            var _success = await user.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });

            if (!_success) {
                throw new ErrorHandler(500, null);
            }

            await ResetPassword.destroy({ where: { user_id: reset_password.user_id } });
            Logger.info(`Senha do usuário ${user.id} alterada com sucesso.`, req);
            return res.status(200).json();
        } catch (err) {
            next(err);
        }
    }
}