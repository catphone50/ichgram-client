import { createSelector } from "@reduxjs/toolkit";

const selectPostState = (state) => state.posts;

export const selectAllPosts = createSelector(
  [selectPostState],
  (postState) => postState.posts
);

export const selectPostsLoading = createSelector(
  [selectPostState],
  (postState) => postState.isLoading
);

export const selectPostsError = createSelector(
  [selectPostState],
  (postState) => postState.error
);

export const selectUserPosts = createSelector(
  [selectPostState],
  (postState) => postState.userPosts
);

export const selectPostById = createSelector(
  [selectPostState],
  (postState) => postState.post
);
// export const selectPostById = (postId) =>
//   createSelector(
//     [selectPostState],
//     (postState) =>
//     postState.post._id === postId ? postState.post : undefined
//   );
