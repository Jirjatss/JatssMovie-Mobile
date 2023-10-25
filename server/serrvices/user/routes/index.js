const express = require("express");
const UserController = require("../controllers/user");
const router = express();

router.get("/users", UserController.findAll);
router.get("/users/:id", UserController.findByPk);
router.delete("/users/:id", UserController.delete);
router.post("/users", UserController.registerUser);

module.exports = router;
