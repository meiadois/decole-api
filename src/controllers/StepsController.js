const database = require('../models')
const Step = database.Step

module.exports = {
    async list(req, res) {
        const steps = await Step.findAll();
        res.json(steps);
    },
    async index(req, res) {
        var { id } = req.params;

        const steps = await Step.findOne(id);
        res.json(steps);
    },
    async store(req, res) {
        var { message } = req.body;

        const [step] = await Step.findOrCreate({
            where: { message }
        });

        return res.json(step);
    },
};