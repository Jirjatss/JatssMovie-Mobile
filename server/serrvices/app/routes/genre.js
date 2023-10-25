const express = require("express");
const GenreController = require("../controllers/genre");
const router = express();

router.get("/genres", GenreController.fetchGenres);
router.get("/genres/:id", GenreController.fetchGenreById);
router.put("/genres/:id", GenreController.editGenre);
router.post("/genres", GenreController.addGenre);
router.delete("/genres/:id", GenreController.deleteGenre);

module.exports = router;
