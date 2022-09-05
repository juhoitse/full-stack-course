import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const initialState = [];

const commentSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {
    appendComments(state, action) {
      state.push(action.payload);
    },
    setComments(state, action) {
      return action.payload;
    },
  },
});

export const { appendComments, setComments } = commentSlice.actions;

export const initializeComments = (id) => {
  return async (dispatch) => {
    try {
      const comments = await blogService.getComments(id);
      dispatch(setComments(comments));
    } catch (error) {
      console.log(error);
    }
  };
};

export const comment = (id, comment, token) => {
  return async (dispatch) => {
    try {
      const com = await blogService.addComment(id, comment, token);
      dispatch(appendComments(com));
    } catch (error) {
      console.log(error);
    }
  };
};

export default commentSlice.reducer;
