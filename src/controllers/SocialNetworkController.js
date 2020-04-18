const database = require('../models')
const SocialNetwork = database.SocialNetwork

module.exports = {
  async list(req, res) {
    const social_networks = await SocialNetwork.findAll();
    res.json(social_networks);
  },
  async index(req, res) {
    var { id } = req.params;
    const social_networks = await SocialNetwork.findOne({
      where: { id }
    });
    res.json(social_networks);
  },

  async store(req, res) {
    var { name } = req.body;
    const [social_network] = await SocialNetwork.findOrCreate({
      where: { name }
    });

    return res.json(social_network);
  },
};