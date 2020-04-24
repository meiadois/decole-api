const database = require('../models')
const Marketplace = database.Marketplace

module.exports = {
    async list(req, res) {
        const marketplaces = await Marketplace.findAll();
        res.json(marketplaces);
    },
    async index(req, res) {
        var { id } = req.params;

        const marketplaces = await Marketplace.findOne(id);
        res.json(marketplaces);
    },
    async store(req, res) {
        var { name } = req.body;

        const [marketplace] = await Marketplace.findOrCreate({
            where: { name }
        });

        return res.json(marketplace);
    },
};