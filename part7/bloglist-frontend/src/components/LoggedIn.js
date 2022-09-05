import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../reducers/loginReducer";

const LoggedIn = () => {
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
    <>
      <p>{user.name} logged in</p>
      <button type="submit" onClick={handleLogout}>
        logout
      </button>
    </>
  );
};

export default LoggedIn;
