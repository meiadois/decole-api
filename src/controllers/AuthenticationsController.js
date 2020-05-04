const database = require('../models');
const User = database.User;
const LoginService = require('../services/login-service');
const AuthService = require('../services/auth-service');

const { ErrorHandler } = require('../helpers/error');

function isEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = {
    async login(req, res, next) {
        try {
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
                    'name': _user.name
                }
            });
            return res.status(200).json({
                'message': "Login realizado com sucesso",
                'user': {
                    'email': _user.email,
                    'name': _user.name,
                    'introduced': _user.introduced,
                    token
                }

            });
        } catch (err) {
            next(err);
        }
    },
    async register(req, res, next) {
        try {
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
                where: { name, email, password }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if (!_user) {
                throw new ErrorHandler(500, null);
            }
            _user.password = null;

            var token = await AuthService.generateToken({
                'user': {
                    'id': _user.id,
                    'email': _user.email,
                    'name': _user.name
                }
            });
            return res.status(200).json({
                'message': "Login realizado com sucesso",
                'user': {
                    'email': _user.email,
                    'name': _user.name,
                    'introduced': _user.introduced,
                    token
                }

            });
            //return res.status(201).json(_user);
        } catch (err) {
            next(err);
        }
    },
}