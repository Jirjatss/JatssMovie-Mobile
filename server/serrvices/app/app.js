if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const errorHandling = require("./middlewares/errorHandling");
const app = express();
const port = Number(process.env.PORT) || 4002;
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(require("./routes"));

app.use(errorHandling);
app.listen(port, () => {
  console.log(`I Love You ${port}`);
});
