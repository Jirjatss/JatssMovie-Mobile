const { Genre } = require("../models");

class GenreController {
  static async fetchGenres(req, res, next) {
    try {
      const genres = await Genre.findAll({
        order: [["updatedAt", "desc"]],
      });
      res.json(genres);
    } catch (error) {
      next(error);
    }
  }
  static async fetchGenreById(req, res, next) {
    try {
      const { id } = req.params;
      const genre = await Genre.findByPk(id);
      if (!genre) throw { name: "genre_not_found" };
      res.json(genre);
    } catch (error) {
      next(error);
    }
  }

  static async addGenre(req, res, next) {
    try {
      const { name } = req.body;
      const genre = await Genre.create({ name });
      res.status(201).json({ id: genre.id, name });
    } catch (error) {
      next(error);
    }
  }

  static async deleteGenre(req, res, next) {
    try {
      const { id } = req.params;
      const genre = await Genre.findByPk(id);
      if (!genre) throw { name: "genre_not_found" };
      await genre.destroy();
      res.json({ message: "Success delete genre" });
    } catch (error) {
      next(error);
    }
  }
  static async editGenre(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const genre = await Genre.findByPk(id);
      if (!genre) throw { name: "genre_not_found" };
      await genre.update({ name });
      res.json({ message: "Success edit genre" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GenreController;
