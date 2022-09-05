import { useState } from "react";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const CreateBlogForm = () => {
  const author = useField("text");
  const title = useField("text");
  const url = useField("text");

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const empty = {
      target: {
        value: "",
      },
    };
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    dispatch(createBlog(blog, user.token));
    title.onChange(empty);
    author.onChange(empty);
    url.onChange(empty);
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input id="title" {...title} />
      </div>
      <div>
        author: <input id="author" {...author} />
      </div>
      <div>
        url: <input id="url" {...url} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  );
};

export default CreateBlogForm;
