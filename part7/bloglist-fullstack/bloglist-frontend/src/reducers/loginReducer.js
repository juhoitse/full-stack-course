import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const initialState = "";

const loginSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {
    saveUser(state, action) {
      return action.payload;
    },
  },
});

export const { saveUser } = loginSlice.actions;

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(username, password);
      if (user) {
        window.localStorage.setItem("loggedIn", JSON.stringify(user));
        dispatch(saveUser(user));
      }
    } catch (error) {
      if (error.response.status === 401) {
        const notif = {
          message: "Wrong username or password",
          error: true,
        };
        dispatch(setNotification(notif));
      } else {
        const notif = {
          message: error.message,
          error: true,
        };
        dispatch(setNotification(notif));
      }
    }
  };
};

export default loginSlice.reducer;
