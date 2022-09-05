import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { initializeComments, comment } from "../reducers/commentReducer";
import { useMatch } from "react-router-dom";
import blogService from "../services/blogs";

const Blog = () => {
  const match = useMatch("/blogs/:id");
  const state = useSelector((state) => state);
  const blogs = state.blogs;
  const user = state.user;
  const comments = state.comments;
  const dispatch = useDispatch();
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  useEffect(() => {
    dispatch(initializeComments(match.params.id));
  }, [dispatch]);

  if (!blog) {
    return null;
  }

  const like = () => {
    dispatch(likeBlog(blog, user.token));
  };

  const remove = () => {
    if (window.confirm("Remove " + blog.title + "?")) {
      dispatch(removeBlog(blog, user.token));
    }
  };

  const addComment = (event) => {
    event.preventDefault();
    const comm = event.target.comm.value;
    event.target.comm.value = "";
    dispatch(comment(blog.id, comm, user.token));
  };

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={like}>like</button>
      </div>
      <div>Added by {blog.user.name}</div>
      <div>
        <button onClick={remove}>remove</button>
      </div>
      <h2>Comments</h2>
      <form onSubmit={addComment}>
        <input type="text" name="comm" />
        <button type="submit">comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
