const express = require('express');
const router = express.Router();
const Blog = require('../db/models').Blog;

const { check, validationResult } = require('express-validator');

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
router.get('/blog', asyncHandler(async (req, res) => {
  console.log(Blog);
  res.status(200).json({test: "home route"});
}))

/* Validation Checks
[
  check('title')
    .exists({checkNull: true, checkFalsy: true})
    .withMessage('Please include your "title"'),
  check('author')
    .exists({checkNull: true, checkFalsy: true})
    .withMessage('Please include your "name"'),
  check('body')
    .exists({checkNull: true, checkFalsy: true})
    .withMessage('Please include your "blog post"'),
], 

*/


/* Create Blog Post*/
router.post('/new', asyncHandler(async (req, res) => {
  // const errors = validationResult(req);
  // //If there are validation errors
  // if(!errors.isEmpty()) {
  //   const errorMessages = errors.array().map(error => error.msg);
  //   return res.status(400).json({errors: errorMessages});
  // }
  let blogPost;
  try {
    blogPost = await Blog.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}));

module.exports = router;