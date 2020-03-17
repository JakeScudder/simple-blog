'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Blog extends Sequelize.Model {}
  Blog.init({
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    body: Sequelize.TEXT
  }, { sequelize });

  return Blog;
};