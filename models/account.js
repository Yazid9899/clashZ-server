'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.Users)
      Account.hasMany(models.TrainTroops)
    }
  }
  Account.init({
    playerTag: DataTypes.STRING,
    maxSpace: DataTypes.INTEGER,
    maxSpell: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    townHallLevel: DataTypes.INTEGER,
    trophies: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};