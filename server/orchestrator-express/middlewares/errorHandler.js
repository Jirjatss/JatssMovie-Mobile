function errorHandler(err, req, res, next) {
  console.log(err.name);
  console.log(err);
  let name = err.name;
  let code = 500;
  let message = "ISE";

  if (name == "AxiosError") {
    code = 404;
    message = err.response.data.message;
  }

  res.status(code).json({ message });
}

module.exports = errorHandler;
