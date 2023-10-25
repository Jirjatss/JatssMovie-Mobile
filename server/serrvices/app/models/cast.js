"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    static associate(models) {
      Cast.hasMany(models.MovieCast);
    }
  }
  Cast.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is required" },
          notEmpty: { msg: "Name is required" },
        },
      },
      profilePict: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Profile Picture is required" },
          notEmpty: { msg: "Profile Picture is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Cast",
    }
  );
  return Cast;
};
