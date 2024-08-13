import { DEFAULT_PREFERRED_NEWS_SOURCES } from "../../constants";
import { NewsSources } from "../../interfaces";
import {
  mapNewsAuthors,
  mapNewsCategories,
  mapNewsSources,
} from "../../mappers/preferencesMappers";
import {
  getAllSourcesFromNewsAPI,
  getFeedFromGuardian,
  getFeedFromNewsAPI,
  getFeedFromNYT,
} from "../../services/apiService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface IdNameSummary {
  id: string;
  name: string;
}
interface PreferencesState {
  authors?: IdNameSummary[];
  preferredAuthors?: IdNameSummary[];
  categories?: IdNameSummary[];
  preferredCategories?: IdNameSummary[];
  sources?: IdNameSummary[];
  preferredSources?: IdNameSummary[];
}

export const initialState: PreferencesState = {};

export const fetchNewsSources = createAsyncThunk(
  "preferences/sources",
  async () => mapNewsSources(DEFAULT_PREFERRED_NEWS_SOURCES)
);

export const fetchNewsCategories = createAsyncThunk(
  "preferences/categories",
  async () => {
    const newsAPICategories = await getAllSourcesFromNewsAPI();
    const nytFeed = await getFeedFromNYT({});
    const guardianFeed = await getFeedFromGuardian({});

    return mapNewsCategories([
      ...guardianFeed.data,
      ...nytFeed.data,
      ...newsAPICategories,
    ]);
  }
);

export const fetchNewsAuthors = createAsyncThunk(
  "preferences/authors",
  async () => {
    const newsAPIFeed = await getFeedFromNewsAPI({});
    let authors = mapNewsAuthors(newsAPIFeed.data);
    if (
      !authors.find(
        ({ id, name }) => id === NewsSources.nyt || name === NewsSources.nyt
      )
    ) {
      authors.push({ id: NewsSources.nyt, name: NewsSources.nyt });
    }
    if (
      !authors.find(
        ({ id, name }) =>
          id === NewsSources.guardian || name === NewsSources.guardian
      )
    ) {
      authors.push({ id: NewsSources.guardian, name: NewsSources.guardian });
    }
    return authors;
  }
);

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    addPreferredSource: (state, { payload }) => {
      state.preferredSources = [...(state.preferredSources || []), payload];
    },
    removePreferredSource: (state, { payload }) => {
      state.preferredSources = state.preferredSources?.filter(
        ({ id }) => id !== payload.id
      );
    },
    addPreferredCategory: (state, { payload }) => {
      state.preferredCategories = [
        ...(state.preferredCategories || []),
        payload,
      ];
    },
    removePreferredCategory: (state, { payload }) => {
      state.preferredCategories = state.preferredCategories?.filter(
        ({ id }) => id !== payload.id
      );
    },
    addPreferredAuthor: (state, { payload }) => {
      state.preferredAuthors = [...(state.preferredAuthors || []), payload];
    },
    removePreferredAuthor: (state, { payload }) => {
      state.preferredAuthors = state.preferredAuthors?.filter(
        ({ id }) => id !== payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewsSources.fulfilled, (state, { payload }) => {
      state.sources = payload;
    });
    builder.addCase(fetchNewsCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
    });
    builder.addCase(fetchNewsAuthors.fulfilled, (state, { payload }) => {
      state.authors = payload;
    });
  },
});

export const {
  addPreferredAuthor,
  addPreferredCategory,
  addPreferredSource,
  removePreferredAuthor,
  removePreferredSource,
  removePreferredCategory,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
