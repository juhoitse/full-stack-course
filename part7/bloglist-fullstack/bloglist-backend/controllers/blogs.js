const blogsRouter = require("express").Router();
const Blog = require("../models/blog.js");
const Comment = require("../models/comment.js");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    _id: 1,
  });
  console.log(blogs);
  await response.status(200).json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;
  if (!user) {
    response.status(401).end();
  }
  if (body.title && body.author && body.url) {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      user: user._id,
      url: body.url,
      likes: body.likes || 0,
    });
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
  } else {
    response.status(400).end();
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  if (!user) {
    response.status(401).end();
  }
  const id = request.params.id;
  const temp = await Blog.deleteOne({ _id: id, user: user.id.toString() });
  if (temp.deletedCount < 1) {
    response.status(401).end();
  }
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const user = request.user;
  if (!user) {
    response.status(401).end();
  }
  const body = request.body;

  const prevBlog = await Blog.findOne({ _id: request.params.id });

  const blog = new Blog({
    _id: request.params.id,
    title: body.title || prevBlog.title,
    author: body.author || prevBlog.author,
    url: body.url || prevBlog.url,
    likes: body.likes || prevBlog.likes,
  });

  const result = await Blog.findOneAndUpdate({ _id: request.params.id }, blog, {
    runValidators: true,
  }).populate("user", { username: 1, name: 1, _id: 1 });
  if (!result) {
    response.status(401).end();
  }
  response.status(200).json(result);
});

blogsRouter.get("/:id/comments", async (request, response) => {
  const id = request.params.id;
  const comments = await Comment.find({ blog: id });
  console.log("comments", comments);
  response.status(200).json(comments);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const user = request.user;
  if (!user) {
    response.status(401).end();
  }
  const body = request.body.text;
  const blogId = request.params.id;
  const comment = new Comment({
    text: body,
    blog: blogId,
  });
  const result = await comment.save();
  response.status(201).json(result);
});

module.exports = blogsRouter;
