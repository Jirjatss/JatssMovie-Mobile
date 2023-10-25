"use strict";
const fs = require("fs");
const { hashPw } = require("../helpers/bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = JSON.parse(fs.readFileSync("./data/user.json")).map((e) => {
      e.password = hashPw(e.password);
      e.createdAt = e.updatedAt = new Date();
      return e;
    });

    let genres = JSON.parse(fs.readFileSync("./data/genre.json")).map((e) => {
      e.createdAt = e.updatedAt = new Date();
      return e;
    });

    let movies = JSON.parse(fs.readFileSync("./data/movie.json")).map((e) => {
      e.createdAt = e.updatedAt = new Date();
      delete e.id;
      return e;
    });

    let casts = JSON.parse(fs.readFileSync("./data/cast.json")).map((e) => {
      e.createdAt = e.updatedAt = new Date();
      return e;
    });

    let movieCasts = JSON.parse(fs.readFileSync("./data/castMovie.json")).map((e) => {
      e.createdAt = e.updatedAt = new Date();
      return e;
    });

    await queryInterface.bulkInsert("Users", users);
    await queryInterface.bulkInsert("Genres", genres);
    await queryInterface.bulkInsert("Movies", movies);
    await queryInterface.bulkInsert("Casts", casts);
    await queryInterface.bulkInsert("MovieCasts", movieCasts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("MovieCasts", movieCasts);
    await queryInterface.bulkDelete("Casts", casts);
    await queryInterface.bulkDelete("Movies", movies);
    await queryInterface.bulkDelete("Genres", genres);
    await queryInterface.bulkDelete("Users", users);
  },
};
