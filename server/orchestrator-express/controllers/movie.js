const MOVIE_BASEURL = "http://localhost:4002/movies/";
const USER_BASEURL = "http://localhost:4001/users/";
const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");

class MovieController {
  static async getAll(req, res, next) {
    try {
      let movies = await redis.get("movies");

      if (!movies) {
        const { data } = await axios.get(MOVIE_BASEURL);
        const dataMovies = await Promise.all(
          data.map(async (e) => {
            const id = e.UserMongoId;

            const { data } = await axios.get(USER_BASEURL + id);
            e.User = data;

            delete e.UserMongoId;
            delete e.genreId;
            delete e.authorId;

            return e;
          })
        );
        movies = dataMovies;
        await redis.set("movies", JSON.stringify(movies));
      } else {
        movies = JSON.parse(movies);
      }
      res.json(movies);
    } catch (error) {
      next(error);
    }
  }
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      let movie = await redis.get(`movie:${id}`);
      if (!movie) {
        const { data } = await axios.get(MOVIE_BASEURL + "detail/" + id);
        const user = await axios.get(USER_BASEURL + data.UserMongoId);

        delete data.UserMongoId;
        delete data.genreId;
        delete data.authorId;

        data.User = user.data;
        movie = data;
        await redis.set(`movie:${id}`, JSON.stringify(movie));
      } else movie = JSON.parse(movie);

      res.json(movie);
    } catch (error) {
      next(error);
    }
  }
  static async getBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      let movie = await redis.get(`movie:${slug}`);
      if (!movie) {
        const { data } = await axios.get(MOVIE_BASEURL + slug);
        const user = await axios.get(USER_BASEURL + data.UserMongoId);

        delete data.UserMongoId;
        delete data.genreId;
        delete data.authorId;

        data.User = user.data;
        movie = data;
        await redis.set(`movie:${slug}`, JSON.stringify(movie));
      } else {
        movie = JSON.parse(movie);
      }

      res.json(movie);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { data } = await axios({
        method: "post",
        url: MOVIE_BASEURL,
        data: req.body,
      });
      await redis.del("movies");
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { slug } = req.params;
      const { data } = await axios.delete(MOVIE_BASEURL + slug);
      await redis.del("movies");
      await redis.del(`movie:${slug}`);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const { slug } = req.params;
      const { data } = await axios({
        method: "put",
        url: MOVIE_BASEURL + slug,
        data: req.body,
      });
      await redis.del("movies");
      await redis.del(`movie:${slug}`);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
