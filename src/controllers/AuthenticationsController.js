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
    }
}