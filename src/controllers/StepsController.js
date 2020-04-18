const database = require('../models')
const Step = database.Step

module.exports = {
  async index(req, res) {
    const steps = await Step.findAll();

    res.json(steps);
  },

  async store(req, res) {
    var { module_id, text, distanceX, distanceY, isRelativeMaxX, isRelativeMaxY } = req.body;

    const [step] = await Step.findOrCreate({
      where: { module_id, text, distanceX, distanceY, isRelativeMaxX, isRelativeMaxY }
    });

    return res.json(step);
  },
};