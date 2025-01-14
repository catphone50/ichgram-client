import { createSelector } from "@reduxjs/toolkit";

const selectLikeState = (state) => state.likes;

export const selectAllLikes = createSelector(
  [selectLikeState],
  (likeState) => likeState.likes
);

export const selectLikesLoading = createSelector(
  [selectLikeState],
  (likeState) => likeState.isLoading
);

export const selectLikesError = createSelector(
  [selectLikeState],
  (likeState) => likeState.error
);

export const selectLikeById = (likeId) =>
  createSelector([selectAllLikes], (likes) =>
    likes.find((like) => like._id === likeId)
  );
