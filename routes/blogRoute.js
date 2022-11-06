
const express = require('express');
const blogController = require('../controllers/blogController');

const blogRoute = express.Router () 

blogRoute.post('/blog', blogController.createBlog)

blogRoute.get('/blogs', blogController.getAllBlogs )

blogRoute.get('/blog/:blogid', blogController.getBlogById )

blogRoute.patch('/blog/:id', blogController.updateBlog)

blogRoute.delete('/blog/:id', blogController.deleteBlog)


module.exports = blogRoute;




