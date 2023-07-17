'use strict';
const fs = require('fs');
const data = JSON.parse(fs.readFileSync("./dataSeed/troop.json")).map((el)=>{
  el.createdAt = new Date()
  el.updatedAt = new Date()
  return el
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Troops", data,{})

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Troops")

  }
};
