import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

const User = () => {
  const match = useMatch("/users/:id");
  const users = useSelector((state) => state.users);
  const user = match ? users.find((usr) => usr.id === match.params.id) : null;

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
