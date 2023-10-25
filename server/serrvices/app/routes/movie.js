const express = require("express");
const MovieController = require("../controllers/movie");

const router = express();

router.get("/movies", MovieController.fetchMovie);
router.get("/movies/:slug", MovieController.fetchMovieBySlug);
router.delete("/movies/:slug", MovieController.deleteMovie);
router.put("/movies/:slug", MovieController.editMovie);
router.post("/movies", MovieController.postMovie);

module.exports = router;
