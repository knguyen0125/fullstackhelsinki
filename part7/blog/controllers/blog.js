const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Blog = require("../models/Blog");

blogRouter.get("/", async (request, response) => {
  // Blog.find({}).then((blogs) => {
  //   // response.json(blogs.map((blog) => blog.toJSON()));
  //   response.json(blogs);
  // });

  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (blog) {
      const returnedBlog = await blog
        .populate("user", {
          username: 1,
          name: 1
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

blogRouter.post("/", async (request, response, next) => {
  const token = request.token;

  try {
    if (!token) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      user: user._id
    });
    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();
    const returnedBlog = await result
      .populate("user", {
        username: 1,
        name: 1
      })
      .execPopulate();
    response.status(201).json(returnedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/:id/comments", async (request, response, next) => {
  const comment = request.body.comment;
  console.log(request.body.comment);
  console.log(request.params.id);

  try {
    const blog = await Blog.findById(request.params.id);
    console.log(blog);

    blog.comments = blog.comments.concat(comment);
    await blog.save();
    const returnedBlog = await blog.populate("user", {
      username: 1,
      name: 1
    });
    response.status(201).json(returnedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const blog = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    });

    const returnedBlog = await updatedBlog
      .populate("user", {
        username: 1,
        name: 1
      })
      .execPopulate();

    response.json(returnedBlog.toJSON());
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (req, res, next) => {
  const token = req.token;
  try {
    if (!token) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(req.params.id);

    if (blog.user.toString() === user._id.toString()) {
      const result = await Blog.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } else {
      res.status(401).json({ error: "user is not the owner of blog post" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
