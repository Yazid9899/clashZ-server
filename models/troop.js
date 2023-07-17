'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Troop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Troop.hasMany(models.TrainTroops)
    }
  }
  Troop.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    space: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    UserId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Troop',
  });
  return Troop;
};