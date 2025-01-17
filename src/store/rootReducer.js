import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import postsReducer from "./features/posts/postsSlice";
import commentsReducer from "./features/comments/commentsSlice";
import likesReducer from "./features/likes/likeSlice";
import profileReducer from "./features/profile/profileSlice";
import friendsReducer from "./features/follow/followSlice";
import searchReducer from "./features/search/searchSlice";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  comments: commentsReducer,
  likes: likesReducer,
  profile: profileReducer,
  friends: friendsReducer,
  search: searchReducer,
});

export default rootReducer;
