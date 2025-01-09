import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import postsReducer from "./features/posts/postsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

export default rootReducer;
