const express = require("express");
// const authentication = require("../middlewares/authentication");
const MovieController = require("../controllers/movie");
const UserController = require("../controllers/user");
// const { authorizationAdmin } = require("../middlewares/authorization");
const CastController = require("../controllers/cast");
const router = express();

router.use(require("./user"));
router.get("/pub/movies", MovieController.fetchMovie);
router.get("/pub/movies/slug/:slug", MovieController.fetchMovieBySlug);
router.get("/pub/movies/detail/:id", MovieController.fetchMovieById);
router.get("/pub/casts", CastController.getCast);
// router.use(authentication);
router.post("/registerAdmin", UserController.registerAdmin);
router.use(require("./movie"));
router.use(require("./genre"));

module.exports = router;
