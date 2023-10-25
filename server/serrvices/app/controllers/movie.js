const { Movie, MovieCast, User, Cast, Genre, sequelize } = require("../models");

class MovieController {
  static async fetchMovie(req, res, next) {
    try {
      const options = {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Genre,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: MovieCast,
            attributes: ["id"],
            include: { model: Cast, attributes: ["id", "name", "profilePict"] },
          },
        ],
        order: [["updatedAt", "desc"]],
      };
      const movies = await Movie.findAll(options);
      res.json(movies);
    } catch (error) {
      next(error);
    }
  }
  static async fetchMovieById(req, res, next) {
    try {
      const { id } = req.params;
      const options = {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Genre,
          },
          {
            model: MovieCast,
            attributes: ["id"],
            include: { model: Cast, attributes: ["name", "profilePict"] },
          },
        ],
      };
      const movie = await Movie.findByPk(id, options);
      if (!movie) throw { name: "movie_not_found" };
      res.json(movie);
    } catch (error) {
      next(error);
    }
  }
  static async fetchMovieBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const options = {
        where: { slug },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Genre,
          },
          {
            model: MovieCast,
            attributes: ["id"],
            include: { model: Cast, attributes: ["name", "profilePict"] },
          },
        ],
      };
      const movie = await Movie.findOne(options);
      if (!movie) throw { name: "movie_not_found" };
      res.json(movie);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { slug } = req.params;
      const movie = await Movie.findOne({ where: { slug } });
      if (!movie) throw { name: "movie_not_found" };
      await movie.destroy();
      res.json({ message: "Success delete movie" });
    } catch (error) {
      next(error);
    }
  }

  static async editMovie(req, res, next) {
    try {
      const { slug } = req.params;

      const { title, synopsis, imgUrl, imgCover, rating, trailerUrl, genreId } = req.body;

      if (!title) throw { name: "Title_is_required" };
      const slugMovie = title.split(" ").join("-");
      const movie = await Movie.findOne({ where: { slug } });
      if (!movie) throw { name: "movie_not_found" };
      await movie.update({ title, synopsis, imgUrl, imgCover, rating, trailerUrl, slug: slugMovie, genreId });
      res.json({ message: "Edit movie successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async postMovie(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { title, synopsis, imgUrl, imgCover, rating, genreId, trailerUrl, casts, UserMongoId = "6527b39316958b7c2c28e766", authorId = 1 } = req.body;
      if (!title) throw { name: "Title_is_required" };
      const slug = title.split(" ").join("-");

      const movie = await Movie.create({ title, synopsis, imgUrl, slug, trailerUrl, authorId, imgCover, rating, genreId, UserMongoId }, { transaction: t });

      casts.forEach((e) => {
        if (!e.name) throw { name: "casts_name_required" };
        else if (!e.profilePict) throw { name: "casts_profile_required" };
      });

      const castsMovie = await Cast.bulkCreate(casts, { transaction: t });

      const movieCast = [];

      castsMovie.forEach((e) => {
        movieCast.push({ MovieId: movie.id, CastId: e.id });
      });

      await MovieCast.bulkCreate(movieCast, { transaction: t });

      res.json({ message: "Success add Movie" });
      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = MovieController;
