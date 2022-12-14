const Blog = require("../models/blogModel");
const { readingTime } = require('../helpers/utils')

exports.createBlog = async (req,res,next) =>{
  try{
    const {title, description, tags, body} = req.body

    const newBlog = new Blog({
       title,
       description: description,
       tags,
       author:req.user._id,
       body, 
       readingtime: readingTime(body)
    })
    
    const createdBlog = await newBlog.save()
    return res.status(201).json({
      status:true,
      data:createdBlog,
    })
  }catch(error){
    next(error)
  }
}


exports.getAllBlogs = async (req,res, next)=>{
  try{
    const blogs = await Blog
    .find({state:'publish'})
    .select({title:1})
    .populate('author', {username:1})
    return res.json({
      status:true,
      data:blogs
    })

  }catch(err){
    err.source = ' get publish blogs controller'
    next(err)
  }
}
exports.getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params
    const blog = await blog.findById(blogid)
      .populate('author', { username: 1 })

    if (blog.state !== 'published') {
      return res.status(403).json({
        status: false,
        error: 'Blog is not published  Or Blog is on default (draft)'
      })
    }

  
    blog.readcount ++ 
    await blog.save()

    return res.json({
      status: true,
      data: blog
    })
  } catch (err) {
    err.source = 'get published blog controller'
    next(err)
  }
}

exports.updateBlog = async (req, res) => {
  try {
    const blog = await blogService.updateBlog(req.params.id, req.body);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await blogService.deleteBlog(req.params.id);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
























