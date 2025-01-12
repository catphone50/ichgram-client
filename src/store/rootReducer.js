import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import postsReducer from "./features/posts/postsSlice";
import commentsReducer from "./features/comments/commentsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

export default rootReducer;
