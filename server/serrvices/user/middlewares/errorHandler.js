function errorHandler(err, req, res, next) {
  console.log(err.name);
  let name = err.name;
  let code = 500;
  let message = "ISE";
  if (name == "email_required") {
    code = 400;
    message = "Email is required";
  } else if (name == "password_required") {
    code = 400;
    message = "Password is required";
  } else if (name == "username_required") {
    code = 400;
    message = "Username is required";
  } else if (name == "BSONError" || name == "user_not_found") {
    code = 404;
    message = "User not found";
  }
  res.status(code).json({ message });
}

module.exports = errorHandler;
