const database = require('../models')
const Module = database.Module
const Step = database.Step

module.exports = {
  async index(req, res) {
    var { id } = req.params;
    const modules = await Module.findAll({
      where: { id },
      include: [{
        model: Step,
        as: 'steps'
      }]
    });
    res.json(modules);
  },

  async store(req, res) {
    var { code, description } = req.body;
    const [module] = await Module.findOrCreate({
      where: { code, description }
    });

    return res.json(module);
  },

  async list(req, res) {
    const modules = await Module.findAll({
      include: [{
        model: Step,
        as: 'steps'
      }]
    });
    res.json(modules);
  },
};