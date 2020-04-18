const database = require('../models')
const User = database.User

module.exports = {
    async index(req, res) {
        var { username, password } = req.body;

        const user = await User.findOne({
            where: { username, password }
        });
        res.json(user);
    },
    async store(req, res) {
        var { username, password, email } = req.body;
        const [user] = await User.findOrCreate({
            where: { username, password, email }
        });
        user.password = null;
        return res.json(user);
    },
    async login(req, res) {
        var { username, password } = req.body;

        const user = await User.findOne({
            where: { username, password }
        });
        user.password = null;
        res.json(user);
    },
};