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

// GET Blog Posts
router.get('/blog', asyncHandler(async (req, res) => {
  const allBlogs = await Blog.findAll();
  res.status(200).json({allBlogs});
}))

// GET Individual Blog Post
router.get('/blog/:id', asyncHandler(async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  console.log(blog);
  res.status(200).json(blog);
}))

// POST Create Blog Post
router.post('/new', [
  check('title')
    .exists({checkNull: true, checkFalsy: true})
    .withMessage('Please include your "title"'),
  check('author')
    .exists({checkNull: true, checkFalsy: true})
    .withMessage('Please include your "name"'),
  check('body')
    .exists({checkNull: true, checkFalsy: true})
    .withMessage('Please include your "blog post"'),
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  //If there are validation errors
  if(!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({errors: errorMessages});
  }
  let blogPost;
  try {
    blogPost = await Blog.create(req.body);
    res.json({blogPost});
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
    } else {
      throw error;
    }
  }
}));

// PUT  Create Update Blog route

module.exports = router;