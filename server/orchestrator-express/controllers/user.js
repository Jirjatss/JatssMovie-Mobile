const USER_BASEURL = "http://localhost:4001/users/";
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

class UserController {
  static async getAll(req, res, next) {
    try {
      let user = await redis.get("users");
      if (!user) {
        const { data } = await axios.get(USER_BASEURL);
        user = data;
        await redis.set("movies", JSON.stringify(user));
      } else {
        user = JSON.parse(user);
      }
      const { data } = await axios.get(USER_BASEURL);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      let user = await redis.get(`user:${id}`);
      if (!user) {
        const { data } = await axios.get(USER_BASEURL + id);
        user = data;
        await redis.set(`user:${id}`, JSON.stringify(user));
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.delete(USER_BASEURL + id);
      await redis.del("users");
      await redis.del(`user:${id}`);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { data } = await axios({
        method: "post",
        url: USER_BASEURL,
        data: req.body,
      });
      await redis.del("users");
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
