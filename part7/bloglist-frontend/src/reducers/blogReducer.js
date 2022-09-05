import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {
    appendBlogs(state, action) {
      state.push(action.payload);
    },
    like(state, action) {
      const id = action.payload;
      const blog = state.find((a) => a.id === id);
      const newBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: blog.user,
        likes: blog.likes + 1,
      };
      return state
        .map((a) => (a.id !== action.payload ? a : newBlog))
        .sort((a, b) => a.likes < b.likes);
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => a.likes < b.likes);
    },
    remove(state, action) {
      const id = action.payload.id;
      return state.filter((a) => a.id !== id);
    },
  },
});

export const { like, setBlogs, appendBlogs, remove } = blogSlice.actions;

export const initiliazeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      const notif = {
        message: error.message,
        error: true,
      };
      dispatch(setNotification(notif));
    }
  };
};

export const likeBlog = (blog, token) => {
  return async (dispatch) => {
    try {
      await blogService.like(blog, token);
      dispatch(like(blog.id));
    } catch (error) {
      const notif = {
        message: error.message,
        error: true,
      };
      dispatch(setNotification(notif));
    }
  };
};

export const createBlog = (blog, token) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.addBlog(blog, token);
      const blogs = await blogService.getAll();
      dispatch(appendBlogs(newBlog));
      dispatch(setBlogs(blogs));
      const notif = {
        message: "a new blog " + newBlog.title + " added!",
        error: false,
      };
      dispatch(setNotification(notif));
    } catch (error) {
      const notif = {
        message: error.message,
        error: true,
      };
      dispatch(setNotification(notif));
    }
  };
};

export const removeBlog = (blog, token) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog, token);
      dispatch(remove(blog));
    } catch (error) {
      const notif = {
        message:
          error.response.status === 401
            ? "You cannot remove others' blogs"
            : error.message,
        error: true,
      };
      dispatch(setNotification(notif));
    }
  };
};

export default blogSlice.reducer;
