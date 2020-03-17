'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Blog', [{
        title: 'Test Post',
        author: "Jake",
        body: "This is a test",
        createdAt : new Date(),
        updatedAt : new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Blog', [{
        author: "Jake"
      }]);
  }
};
