const express = require('express');
const router = express.Router();
const Blog = require('../db/models').Blog;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

/* Get Blog Posts*/
router.get('/', asyncHandler(async (req, res) => {
  console.log("home route");
}))