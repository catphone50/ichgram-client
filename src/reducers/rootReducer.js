import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../actions/userSlice";
import authReducer from "../actions/authSlice";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,

  // posts: postsReducer,
});

export default rootReducer;
