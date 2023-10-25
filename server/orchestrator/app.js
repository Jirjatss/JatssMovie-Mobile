if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { typeDefs: typeDefsMovies, resolvers: resolversMovies } = require("./schemas/movie");
const { typeDefs: typeDefsUsers, resolvers: resolversUsers } = require("./schemas/user");
const { typeDefs: typeDefsGenres, resolvers: resolversGenres } = require("./schemas/genre");

const server = new ApolloServer({
  typeDefs: [typeDefsMovies, typeDefsUsers, typeDefsGenres],
  resolvers: [resolversMovies, resolversUsers, resolversGenres],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: Number(process.env.PORT) || 4000 },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
