"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      Movie.belongsTo(models.User, { foreignKey: "authorId" });
      Movie.belongsTo(models.Genre, { foreignKey: "genreId" });
      Movie.hasMany(models.MovieCast);
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title is required" },
          notNull: { msg: "Title is required" },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Slug is required" },
          notNull: { msg: "Slug is required" },
        },
      },
      trailerUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Trailer URL is required" },
          notNull: { msg: "Trailer URL is required" },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Image URL is required" },
          notNull: { msg: "Image URL is required" },
        },
      },
      imgCover: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "image Cover is required" },
          notNull: { msg: "image Cover is required" },
        },
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Synopsis is required" },
          notNull: { msg: "Synopsis is required" },
        },
      },

      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: {
            args: 1,
            msg: "Rating value can't be less than 1",
          },
          notEmpty: { msg: "Rating is required" },
          notNull: { msg: "Rating is required" },
        },
      },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Genre is required" },
          notNull: { msg: "Genre is required" },
        },
        references: {
          model: "Genres",
          key: "id",
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Author is required" },
          notNull: { msg: "Author is required" },
        },
        references: {
          model: "Users",
          key: "id",
        },
      },
      UserMongoId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "User Mongo is required" },
          notNull: { msg: "User Mongo is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  Movie.beforeCreate((e) => {
    e.slug = e.title.split(" ").join("-");
  });
  return Movie;
};
