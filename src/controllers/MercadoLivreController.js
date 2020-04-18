const Melif = require('../services/Melif');

module.exports = {
    async getUserByNickname(req, res) {
        var { nickname } = req.query;
        const user = await Melif.getUserByNickname(nickname);
        return res.json(user);
    },
    async getUserReputationByNickname(req, res) {
        var { nickname } = req.query;
        const user = await Melif.getUserByNickname(nickname);
        const reputation = await Melif.getUserReputationById(user.seller.id)
        return res.json(reputation);
    },
}