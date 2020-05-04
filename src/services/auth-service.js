'use strict';
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../helpers/error');

module.exports = {
    async generateToken(data) {
        return jwt.sign(data, process.env.SALT_KEY, { expiresIn: '600d' });
    },
    async decodeToken(token) {
        var data = await jwt.verify(token, process.env.SALT_KEY);
        return data;
    },

    authorize(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'];
        if (!token) {
            throw new ErrorHandler(401, `Token inválido`);
        } else {
            jwt.verify(token, process.env.SALT_KEY, async function (err, decoded) {
                if (err) {
                    console.log(err);
                    return next(new ErrorHandler(401, `Token inválido`));
                }
                console.log('decoded');
                res.locals.user = decoded.user
                next();
            })
        }
    },
    /*
    isAdmin(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'];
        if (!token) {
            return res.status(401).json({
                message: 'Acesso restrito.'
            });
        } else {
            jwt.verify(token, process.env.SALT_KEY, async function (err, decoded) {
                if (err) {
                    return res.status(401).json({
                        message: 'Token Inválido.'
                    });
                } else {
                    res.locals.authentication = null;
                    if (!decoded || !decoded.user || !decoded.user.mercado_libre_id) {
                        return res.status(401).json({
                            message: 'Token não contém informações necessárias.'
                        });
                    }
                    res.locals.authentication = await AuthenticationsRepository.getValidAuthenticationByMercadoLibreId(decoded.user.mercado_libre_id);

                    if (!res.locals.authentication) {
                        return res.status(401).json({
                            message: 'Nâo há uma autentificação vinculada a este usuário.'
                        });
                    }
                    if (decoded.user.roles.includes('admin')) {
                        next();
                    } else {
                        return res.status(401).json({
                            message: 'Somente administradores são permitidos.'
                        });
                    }
                }
            })
        }
    }*/
}