import Togglable from "./Togglable";
import CreateBlogForm from "./CreateBlogForm";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const state = useSelector((state) => state);
  const blogs = state.blogs;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <h2>blogs</h2>
      <ul id="blog-list">
        {blogs.map((blog) => (
          <li key={blog.id} style={blogStyle}>
            <Link to={"/blogs/" + blog.id}>
              {blog.title} {blog.author}
            </Link>
          </li>
        ))}
      </ul>
      <h2>Create a blog</h2>
      <Togglable buttonLabel={"new blog"}>
        <CreateBlogForm />
      </Togglable>
    </div>
  );
};

export default BlogList;
