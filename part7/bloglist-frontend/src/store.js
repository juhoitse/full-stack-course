import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";
import commentReducer from "./reducers/commentReducer";
import { configureStore } from "@reduxjs/toolkit";

//const store = createStore(reducer)

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: loginReducer,
    users: userReducer,
    comments: commentReducer,
  },
});

export default store;
