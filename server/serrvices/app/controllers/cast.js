const { Cast } = require("../models");

class CastController {
  static async getCast(req, res, next) {
    try {
      const casts = await Cast.findAll({
        order: [["name", "desc"]],
      });
      res.json(casts);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CastController;
