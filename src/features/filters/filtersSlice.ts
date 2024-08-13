import { IdNameSummary } from "../preferences/preferencesSlice";
import { createSlice } from "@reduxjs/toolkit";

export interface FiltersState {
  sources: IdNameSummary[];
  categories: IdNameSummary[];
  authors: IdNameSummary[];
  dated?: string;
}

export const initialState: FiltersState = {
  sources: [],
  categories: [],
  authors: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilters: (state, { payload }) => {
      if (payload.sources) {
        state.sources = payload.sources;
      }
      if (payload.categories) {
        state.categories = payload.categories;
      }
      if (payload.authors) {
        state.authors = payload.authors;
      }
    },
    addPreferredSourceToFilters: (state, { payload }) => {
      if (
        !state.sources.find(
          ({ id, name }) => id === payload.id && name === payload.name
        )
      ) {
        state.sources = [...state.sources, { ...payload }];
      }
    },
    removePreferredSourceFromFilters: (state, { payload }) => {
      state.sources = state.sources.filter(
        ({ id, name }) => id !== payload.id && name !== payload.name
      );
    },
    addPreferredCategoryToFilters: (state, { payload }) => {
      if (
        !state.categories.find(
          ({ id, name }) => id === payload.id && name === payload.name
        )
      ) {
        state.categories = [...state.categories, { ...payload }];
      }
    },
    addPreferredAuthorToFilters: (state, { payload }) => {
      if (
        !state.authors.find(
          ({ id, name }) => id === payload.id && name === payload.name
        )
      ) {
        state.authors = [...state.authors, { ...payload }];
      }
    },
    removePreferredCategoryFromFilters: (state, { payload }) => {
      state.categories = state.categories.filter(
        ({ id, name }) => id !== payload.id && name !== payload.name
      );
    },
    removePreferredAuthorFromFilters: (state, { payload }) => {
      state.authors = state.authors.filter(
        ({ id, name }) => id !== payload.id && name !== payload.name
      );
    },
    resetAllFilters: (state) => {
      state.sources = initialState.sources;
      state.categories = initialState.categories;
      state.authors = initialState.authors;
      state.dated = initialState.dated;
    },
    setDateFilter: (state, { payload }) => {
      state.dated = payload;
    },
  },
});

export const {
  updateFilters,
  setDateFilter,
  addPreferredSourceToFilters,
  removePreferredSourceFromFilters,
  addPreferredCategoryToFilters,
  addPreferredAuthorToFilters,
  removePreferredCategoryFromFilters,
  removePreferredAuthorFromFilters,
  resetAllFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;
