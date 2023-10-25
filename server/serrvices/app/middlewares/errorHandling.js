function errorHandling(err, req, res, next) {
  console.log(err);
  let name = err.name;
  let code = 500;
  let message = "Internal Server Error";
  if (name == "SequelizeValidationError" || name == "SequelizeUniqueConstraintError" || name == "SequelizeForeignKeyConstraintError") {
    code = 400;
    message = err.errors[0].message;
  } else if (name == "email_password_required") {
    code = 400;
    message = "Email/Password is required";
  } else if (name == "invalid_input_login") {
    code = 400;
    message = "Invalid Email/Password";
  } else if (name == "movie_not_found") {
    code = 404;
    message = "Movie not found";
  } else if (name == "unauthenticated") {
    code = 401;
    message = "Invalid Token";
  } else if (name == "casts_name_required") {
    code = 400;
    message = "Cast Name is required";
  } else if (name == "casts_profile_required") {
    code = 400;
    message = "Cast Profile is Required";
  } else if (name == "genre_not_found") {
    code = 404;
    message = "Genre not found";
  } else if (name == "unauthorized") {
    code = 403;
    message = "You're not authorized";
  } else if (name == "Title_is_required") {
    code = 400;
    message = "Title is required";
  }
  res.status(code).json({ message });
}

module.exports = errorHandling;
