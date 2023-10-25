const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "unauthenticated" };

    const payload = verifyToken(access_token);

    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "unauthenticated" };

    req.user = {
      id: payload.id,
      name: user.username,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
