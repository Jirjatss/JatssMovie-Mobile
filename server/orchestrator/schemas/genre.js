const axios = require("axios");
const GENRE_BASE_URL = "http://app-service:4002/genres";
const redis = require("../redis/redis");

const typeDefs = `#graphql

type Genre {
    id: ID,
    name: String
}

type Query {
    Genres: [Genre],
}
`;

const resolvers = {
  Query: {
    Genres: async () => {
      try {
        let genres = await redis.get("genres");
        if (!genres) {
          const { data } = await axios.get(GENRE_BASE_URL);
          genres = data;
          await redis.set("genres", JSON.stringify(genres));
        } else {
          genres = JSON.parse(genres);
        }
        return genres;
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
