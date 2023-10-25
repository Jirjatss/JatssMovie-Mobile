const bcrypt = require("bcryptjs");

const hashPw = (pw) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pw, salt);
};

const comparePw = (pw, hashedPw) => {
  return bcrypt.compareSync(pw, hashedPw);
};

module.exports = {
  hashPw,
  comparePw,
};
