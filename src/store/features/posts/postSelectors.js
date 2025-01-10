export const selectAllPosts = (state) => state.posts.posts;
export const selectPostsLoading = (state) => state.posts.isLoading;
export const selectPostsError = (state) => state.posts.error;
export const selectUserPosts = (state) => state.posts.userPosts;
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
