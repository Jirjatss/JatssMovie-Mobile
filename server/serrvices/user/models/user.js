const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongo");
const { hashPw } = require("../helpers/bcrypt");

class UserModel {
  static collection() {
    return getDb().collection("users");
  }
  static async findAll() {
    // const users = await this.collection().find({}, { password: 0 }).toArray();
    const users = await this.collection()
      .find({}, { projection: { password: 0 } })
      .toArray();

    return users;
  }

  static async findByPk(id) {
    const user = await this.collection().findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
    return user;
  }

  static async delete(id) {
    const user = await this.collection().deleteOne({ _id: new ObjectId(id) });
    return user;
  }

  static async create(data) {
    const input = { ...data, password: hashPw(data.password) };
    await this.collection().insertOne(input);
  }
}

module.exports = UserModel;
