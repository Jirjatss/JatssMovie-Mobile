const UserModel = require("../models/user");

class UserController {
  static async findAll(req, res, next) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
  static async findByPk(req, res, next) {
    const { id } = req.params;
    try {
      const user = await UserModel.findByPk(id);
      if (!user) throw { name: "user_not_found" };
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      const user = await UserModel.delete(id);
      if (!user) throw { name: "user_not_found" };
      res.json({ message: "Success Delete User" });
    } catch (error) {
      next(error);
    }
  }

  static async registerUser(req, res, next) {
    try {
      const { email, password, username, phoneNumber, role = "Admin", address } = req.body;
      if (!email) throw { name: "email_required" };
      if (!password) throw { name: "password_required" };
      if (!username) throw { name: "username_required" };

      await UserModel.create({ email, password, username, phoneNumber, address, role });
      res.status(201).json({ message: "Success Register" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
