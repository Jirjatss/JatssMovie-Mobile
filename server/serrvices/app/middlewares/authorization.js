async function authorizationAdmin(req, res, next) {
  try {
    const { role } = req.user;
    if (role !== "Super Admin") throw { name: "unauthorized" };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authorizationAdmin };
