import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "../reducers/loginReducer";
import { Link } from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!user) {
    return null;
  }

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedIn");
    dispatch(saveUser(null));
  };
  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user.name} logged in{" "}
      <button type="submit" onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default Menu;
