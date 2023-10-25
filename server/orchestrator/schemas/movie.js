const axios = require("axios");
const MOVIE_BASEURL = "http://app-service:4002/movies/";
const USER_BASEURL = "http://user-service:4001/users/";
const redis = require("../redis/redis");
const typeDefs = `#graphql

  type Cast {
    name: String,
    profilePict: String
  }

  type MovieCast {
    id: ID
    Cast: Cast
  }

  type Genre {
    name: String
  }

  type Movie {
    id: ID,
    title: String,
    slug: String,
    trailerUrl: String,
    imgCover: String,
    imgUrl: String,
    synopsis: String,
    rating: Float,
    User: User,
    genreId: ID,
    authorId: ID,
    UserMongoId: String,
    Genre: Genre,
    MovieCasts: [MovieCast]

  }

  type User {
    _id: String,
    username: String,
    email: String,
    password: String,
    phoneNumber: String,
    role: String,
    address: String
  }

  type Query {
    getMovies: [Movie],
    getMovieBySlug(slug:String) : Movie
  }

  input MovieCasts {
    name: String,
    profilePict: String
  }

  input MovieInput {
    title: String,
    synopsis: String,
    imgUrl: String,
    imgCover: String,
    rating: Float,
    genreId: ID,
    trailerUrl: String,
    UserMongoId: String,
    authorId: ID,
    casts: [MovieCasts]

  }

  type Mutation {
    addMovie(movie: MovieInput) : String,
    editMovie(movie: MovieInput, slug: String) : String,
    deleteMovie(slug: String) : String
  }

`;

const resolvers = {
  Query: {
    getMovies: async () => {
      try {
        let movies = await redis.get("movies");
        if (!movies) {
          const { data } = await axios.get(MOVIE_BASEURL);
          const dataMovies = await Promise.all(
            data.map(async (e) => {
              const id = e.UserMongoId;
              const { data } = await axios.get(USER_BASEURL + id);
              e.User = data;
              return e;
            })
          );
          movies = dataMovies;
          await redis.set("movies", JSON.stringify(movies));
        } else {
          movies = JSON.parse(movies);
        }
        return movies;
      } catch (error) {
        const msg = error.response.data.message;
        throw msg;
      }
    },

    getMovieBySlug: async (_, args) => {
      try {
        let movie = await redis.get(`movie:${args.slug}`);
        if (!movie) {
          const { data } = await axios.get(MOVIE_BASEURL + args.slug);
          const user = await axios.get(USER_BASEURL + data.UserMongoId);
          data.User = user.data;
          movie = data;
          await redis.set(`movie:${args.slug}`, JSON.stringify(movie));
        } else {
          movie = JSON.parse(movie);
        }
        return movie;
      } catch (error) {
        const msg = error.response.data.message;
        throw msg;
      }
    },
  },
  Mutation: {
    addMovie: async (_, args) => {
      try {
        const { title, synopsis, imgUrl, imgCover, rating, genreId, trailerUrl, casts, UserMongoId, authorId } = args.movie;
        const { data } = await axios({
          method: "post",
          url: MOVIE_BASEURL,
          data: {
            title,
            synopsis,
            imgUrl,
            imgCover,
            rating,
            genreId,
            trailerUrl,
            casts,
            UserMongoId,
            authorId,
          },
        });

        await redis.del("movies");
        return data.message;
      } catch (error) {
        const msg = error.response.data.message;
        throw msg;
      }
    },

    editMovie: async (_, args) => {
      try {
        const { title, synopsis, imgUrl, imgCover, rating, genreId, trailerUrl } = args.movie;
        const { data } = await axios({
          method: "put",
          url: MOVIE_BASEURL + args.slug,
          data: {
            title,
            synopsis,
            imgUrl,
            imgCover,
            rating,
            genreId,
            trailerUrl,
          },
        });

        await redis.del("movies");
        await redis.del(`movie:${args.slug}`);
        return data.message;
      } catch (error) {
        const msg = error.response.data.message;
        throw msg;
      }
    },

    deleteMovie: async (_, args) => {
      try {
        const { data } = await axios.delete(MOVIE_BASEURL + args.slug);
        await redis.del("movies");
        await redis.del(`movie:${args.slug}`);
        return data.message;
      } catch (error) {
        const msg = error.response.data.message;
        throw msg;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
