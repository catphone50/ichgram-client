import { createSelector } from "@reduxjs/toolkit";

const selectCommentState = (state) => state.comments;

export const selectAllComments = createSelector(
  [selectCommentState],
  (commentState) => commentState.comments
);

export const selectCommentsLoading = createSelector(
  [selectCommentState],
  (commentState) => commentState.isLoading
);

export const selectCommentsError = createSelector(
  [selectCommentState],
  (commentState) => commentState.error
);

export const selectCommentById = (commentId) =>
  createSelector([selectAllComments], (comments) =>
    comments.find((comment) => comment._id === commentId)
  );
