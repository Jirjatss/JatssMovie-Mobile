const express = require("express");
const UserController = require("../controllers/user");
const router = express();

router.get("/users", UserController.getAll);
router.get("/users/:id", UserController.getById);
router.post("/users", UserController.register);
router.delete("/users/:id", UserController.delete);

module.exports = router;
