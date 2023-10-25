const { Op } = require("sequelize");
const { comparePw } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async getUser(req, res, next) {
    try {
      const user = await User.findAll({ where: { [Op.or]: [{ role: "Admim" }, { role: "Super Admin" }] }, attributes: { exclude: "password" } });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async registerAdmin(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const user = await User.create({ username, email, password, phoneNumber, address, role: "Admin" });
      res.status(201).json({ id: user.id, email });
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "email_password_required" };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "invalid_input_login" };

      const validPw = comparePw(password, user.password);

      if (!validPw) throw { name: "invalid_input_login" };

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token, name: user.username });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
