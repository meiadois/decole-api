const database = require('../models');
const User = database.User;
const LoginService = require('../services/login-service');
const AuthService = require('../services/auth-service');

const { ErrorHandler } = require('../helpers/error');

module.exports = {
    async login(req, res, next) {
        try {
            var { email, password } = req.body;

            const _user = await User.findOne({ where: { email } });

            if (_user === null) {
                throw new ErrorHandler(401, `Não há usuários com o email ${email}.`);
            }

            var success = await LoginService.login(_user.password, password);
            if (!success) {
                throw new ErrorHandler(401, `Email ou Senha incorretos.`);
            }
            var token = await AuthService.generateToken({
                'user': {
                    'id': _user.id,
                    'email': _user.email,
                    'username': _user.username
                }
            });
            return res.status(200).json({
                "message": "Login realizado com sucesso",
                token
            });
        } catch (err) {
            next(err);
        }
    },
    async register(req, res, next) {
        try {
            var { username, email, password } = req.body;
            if (!username || !email || !password) {
                throw new ErrorHandler(400, null);
            }
            password = await LoginService.createHashedPassword(password);

            const [_user] = await User.findOrCreate({
                where: { username, email, password }
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
                    'username': _user.username
                }
            });
            return res.status(200).json({
                "message": "Cadastro realizado com sucesso",
                token
            });
            //return res.status(201).json(_user);
        } catch (err) {
            next(err);
        }
    },
}