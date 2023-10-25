const bcrypt = require("bcryptjs");

const hashPw = (pw) => {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pw, salt);
};

module.exports = {
  hashPw,
};
