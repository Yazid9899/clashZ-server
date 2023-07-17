'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Account)
    }
  }
  Users.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "Email already used"
      },
      allowNull: {
        msg: "Email is required"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Invalid Email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        msg: "Password is required"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required"
        }
      }
    },
    role: DataTypes.STRING,
    fiture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });

  Users.beforeCreate(account => {
    account.password = hashPassword(account.password)
  })
  return Users;
};