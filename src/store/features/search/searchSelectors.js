import { createSelector } from "@reduxjs/toolkit";

const selectSearchState = (state) => state.search;

export const selectSearchResults = (state) => state.search.results;
export const selectSearchLoading = (state) => state.search.loading;

export const selectSearchError = createSelector(
  [selectSearchState],
  (postState) => postState.console.error
);
