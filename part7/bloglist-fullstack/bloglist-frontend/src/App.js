import { useEffect } from "react";
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import User from "./components/User";
import UserList from "./components/UserList";
import Notification from "./components/Notification";
import Login from "./components/Login";
import Menu from "./components/Menu";
import { initiliazeBlogs } from "./reducers/blogReducer";
import { initiliazeUsers } from "./reducers/userReducer";
import { saveUser } from "./reducers/loginReducer";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const user = state.user;
  const users = state.users;

  useEffect(() => {
    dispatch(initiliazeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initiliazeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedIn");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(saveUser(user));
    }
  }, [dispatch]);

  return (
    <div>
      <Menu />
      <Notification />
      <Routes>
        <Route path="/" element={user ? <BlogList /> : <Login />} />
        <Route path="/users" element={user ? <UserList /> : <Login />} />
        <Route path="/users/:id" element={user ? <User /> : <Login />} />
        <Route path="/blogs/:id" element={user ? <Blog /> : <Login />} />
      </Routes>
    </div>
  );
};

export default App;
