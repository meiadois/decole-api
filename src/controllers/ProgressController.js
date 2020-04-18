const database = require('../models');
const Progress = database.Progress;
const User = database.User;
const Module = database.Module;

module.exports = {
    async list(req, res) {
        const progress = await Progress.findAll();
        res.json(progress);
    },
    async index(req, res) {
        const { id } = req.params;
        const progress = await Progress.findOne({
            where: {
                id
            }
        });
        res.json(progress);
    },
    async getByUser(req, res) {
        const { user_id } = req.params;
        const progress = await Progress.findAll({
            where: {
                user_id
            }
        });
        res.json(progress);
    },
    async getByUserAndModule(req, res) {
        const { user_id, module_id } = req.params;
        const progress = await Progress.findOne({
            where: {
                user_id, module_id
            }
        });
        res.json(progress);
    },

    async store(req, res) {
        var { user_id, module_id, done } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const module = await Module.findByPk(module_id);

        if (!module) {
            return res.status(400).json({ error: 'Module not found' });
        }

        const [progress, created] = await Progress.findOrCreate({
            where: { user_id, module_id, done },
            defaults: {
                "user_id": user_id,
                "module_id": module_id,
                "done": done
            }
        });

        return res.json(progress);
    },
};