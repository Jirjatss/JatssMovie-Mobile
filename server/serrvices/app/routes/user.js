const express = require("express");
const UserController = require("../controllers/user");
const router = express();

router.get("/users", UserController.getUser);
router.post("/login", UserController.loginUser);
module.exports = router;
