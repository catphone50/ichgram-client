import { createSelector } from "@reduxjs/toolkit";

const selectUserState = (state) => state.user;

export const selectUser = createSelector(
  [selectUserState],
  (userState) => userState.user
);

export const selectIsLoading = createSelector(
  [selectUserState],
  (userState) => userState.isLoading
);

export const selectIsLoggedIn = createSelector(
  [selectUserState],
  (userState) => userState.isLoggedIn
);

export const selectError = createSelector(
  [selectUserState],
  (userState) => userState.error
);

export const selectToken = createSelector(
  [selectUserState],
  (userState) => userState.token
);
