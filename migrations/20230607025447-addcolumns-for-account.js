'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Accounts","name", {type:Sequelize.STRING})
    await queryInterface.addColumn("Accounts","level", {type:Sequelize.INTEGER})
    await queryInterface.addColumn("Accounts","townHallLevel", {type:Sequelize.INTEGER})
    await queryInterface.addColumn("Accounts","trophies", {type:Sequelize.INTEGER})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Accounts","name")
    await queryInterface.removeColumn("Accounts","level")
    await queryInterface.removeColumn("Accounts","townHallLevel")
    await queryInterface.removeColumn("Accounts","trophies")
  }

};
