const axios = require("axios");
const USER_BASEURL = "http://user-service:4001/users/";
const redis = require("../redis/redis");

const typeDefs = `#graphql
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
    getUsers: [User]
    getUserById(id:String) : User,
  }

  input UserInput {
    username: String,
    email: String,
    password: String,
    role: String,
    phoneNumber: String,
    address: String,
  }

  type Mutation {
    registerUser(user: UserInput) : String,
    deleteUser(id: String) : String
  } 
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        let users = await redis.get("users");
        if (!users) {
          const { data } = await axios.get(USER_BASEURL);
          users = data;
          await redis.set("users", JSON.stringify(users));
        } else {
          users = JSON.parse(users);
        }
        return users;
      } catch (error) {
        const msg = error.response.data.message;
        throw msg;
      }
    },

    getUserById: async (_, args) => {
      try {
        let user = await redis.get(`user:${args.id}`);
        if (!user) {
          const { data } = await axios.get(USER_BASEURL + args.id);
          user = data;
          await redis.set(`user:${args.id}`, JSON.stringify(user));
        } else {
          user = JSON.parse(user);
        }
        return user;
      } catch (error) {
        const msg = error.response.data.message;
        throw msg;
      }
    },
  },

  Mutation: {
    registerUser: async (_, args) => {
      try {
        const { username, email, password, role, phoneNumber, address } = args.user;
        const { data } = await axios({
          method: "post",
          url: USER_BASEURL,
          data: {
            username,
            email,
            password,
            role,
            phoneNumber,
            address,
          },
        });
        await redis.del("users");
        return data.message;
      } catch (error) {
        const msg = error.response.data.message;
        throw msg;
      }
    },

    deleteUser: async (_, args) => {
      try {
        const { data } = await axios.delete(USER_BASEURL + args.id);
        await redis.del("users");
        await redis.del(`user:${args.id}`);
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
