const blogRouter = require('express').Router();
const User = require('../models/User');
const Blog = require('../models/Blog');

blogRouter.get('/', async (request, response) => {
  // Blog.find({}).then((blogs) => {
  //   // response.json(blogs.map((blog) => blog.toJSON()));
  //   response.json(blogs);
  // });

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (blog) {
      const returnedBlog = await blog
        .populate('user', {
          username: 1,
          name: 1,
        })
        .execPopulate();
      response.status(200).json(returnedBlog.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.post('/', async (request, response, next) => {
  const anyUser = await User.findOne({});
  console.log(anyUser);

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    user: anyUser._id,
  });

  try {
    const result = await blog.save();

    anyUser.blogs = anyUser.blogs.concat(result._id);
    await anyUser.save();
    const returnedBlog = await result
      .populate('user', {
        username: 1,
        name: 1,
      })
      .execPopulate();
    response.status(201).json(returnedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  try {
    const blog = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });

    const returnedBlog = await updatedBlog
      .populate('user', {
        username: 1,
        name: 1,
      })
      .execPopulate();

    response.json(returnedBlog.toJSON());
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    const result = await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
