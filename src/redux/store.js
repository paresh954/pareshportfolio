import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./slices/blogSlice";
import projectReducer from "./slices/projectSlice";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    projects: projectReducer,
  },
});

export default store;
