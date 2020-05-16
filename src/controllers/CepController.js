const database = require('../models');
const Channel = database.Channel;
const Account = database.Account;
const User = database.User;
var cepPromise = require("cep-promise")

const { ErrorHandler } = require('../helpers/error');

module.exports = {
    async index(req, res, next) {
        try {
            var { cep } = req.params;
            const cep_infos = await cepPromise(cep)
                .then(function (result) {
                    return result;
                })
                .catch(function (err) {
                    console.log(err)
                    return null
                });
            if (cep_infos == null) {
                throw new ErrorHandler(400, `CEP [${cep}] não encontrado ou mal formulado.`);
            }
            res.json(cep_infos);
        } catch (err) {
            next(err);
        }
    },
};