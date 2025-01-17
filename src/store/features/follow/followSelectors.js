import { createSelector } from "@reduxjs/toolkit";

// Селектор для получения всех данных пользователя
const selectUserState = (state) => state.users;

// Селектор для получения списка подписчиков
export const selectFollowers = createSelector(
  [selectUserState],
  (userState) => userState.followers
);

// Селектор для получения списка подписок
export const selectFollowing = createSelector(
  [selectUserState],
  (userState) => userState.following
);

// Селектор для получения состояния загрузки
export const selectIsLoading = createSelector(
  [selectUserState],
  (userState) => userState.isLoading
);

// Селектор для получения ошибки
export const selectError = createSelector(
  [selectUserState],
  (userState) => userState.error
);
