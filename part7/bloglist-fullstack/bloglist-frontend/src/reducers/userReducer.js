import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";
import { setNotification } from "./notificationReducer";

const initialState = [];

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;

export const initiliazeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch(setUsers(users));
    } catch (error) {
      const notif = {
        message: error.message,
        error: true,
      };
      dispatch(setNotification(notif));
    }
  };
};

export default userSlice.reducer;
