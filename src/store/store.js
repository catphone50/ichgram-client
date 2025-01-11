import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { loadState, saveState } from "../mddleware/stor";

// const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
});

// store.subscribe(() => {
//   saveState(store.getState());
// });

export default store;
