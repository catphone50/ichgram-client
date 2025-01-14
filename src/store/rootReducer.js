import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import postsReducer from "./features/posts/postsSlice";
import commentsReducer from "./features/comments/commentsSlice";
import likesReducer from "./features/likes/likeSlice";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  comments: commentsReducer,
  likes: likesReducer,
});

export default rootReducer;
