const express = require("express");
const MovieController = require("../controllers/movie");

const router = express();

router.get("/movies", MovieController.getAll);
router.get("/movies/detail/:id", MovieController.getById);
router.get("/movies/slug/:slug", MovieController.getBySlug);
router.delete("/movies/:id", MovieController.delete);
router.put("/movies/:id", MovieController.edit);
router.post("/movies", MovieController.create);

module.exports = router;
