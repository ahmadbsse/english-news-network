import {
  ACTION_FETCH_FEED_GUARDIAN,
  ACTION_FETCH_FEED_NEWS_API,
  ACTION_FETCH_FEED_NYT,
  DEFAULT_PREFERRED_NEWS_SOURCES,
} from "../../constants";
import {
  FeedItem,
  NewsSources,
  FetchFeedParams,
  FeedList,
} from "../../interfaces";
import { transformFeed } from "../../mappers/newsMappers";
import { RootState } from "../../rootReducer";
import {
  getFeedFromGuardian,
  getFeedFromNewsAPI,
  getFeedFromNYT,
} from "../../services/apiService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enhanceFetchFeedParams } from "../../utils/feedUtil";

interface NewsState {
  feedNewsAPI?: FeedList;
  feedNewyorkTimes?: FeedList;
  feedGuardian?: FeedList;
}

export const initialState: NewsState = {
};

export const fetchFeedNewsAPI = createAsyncThunk(
  ACTION_FETCH_FEED_NEWS_API,
  async (args: FetchFeedParams, { rejectWithValue, getState }) => {
    try {
      const { data = [], total = 0 } = await getFeedFromNewsAPI( enhanceFetchFeedParams(getState() as RootState, args));
      return { list: transformFeed(data), total };
    } catch (errorText) {
      return rejectWithValue({ errorText });
    }
  }
);

export const fetchNewYorkTimesAPI = createAsyncThunk(
  ACTION_FETCH_FEED_NYT,
  async (args: FetchFeedParams, { rejectWithValue, getState }) => {
    try {
      const { data = [], total = 0 } = await getFeedFromNYT(
        enhanceFetchFeedParams(getState() as RootState, args)
      );
      return { list: transformFeed(data), total };
    } catch (errorText) {
      return rejectWithValue({ errorText });
    }
  }
);

export const fetchGuardianAPI = createAsyncThunk(
  ACTION_FETCH_FEED_GUARDIAN,
  async (args: FetchFeedParams, { rejectWithValue, getState }) => {
    try {
      const { data = [], total = 0 } = await getFeedFromGuardian(
        enhanceFetchFeedParams(getState() as RootState, args)
      );
      return { list: transformFeed(data), total };
    } catch (errorText) {
      return rejectWithValue({ errorText });
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    resetFeed: (state) => {
      state.feedGuardian = initialState.feedGuardian;
      state.feedNewsAPI = initialState.feedNewsAPI;
      state.feedNewyorkTimes = initialState.feedNewyorkTimes;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeedNewsAPI.fulfilled, (state, { payload }) => {
      state.feedNewsAPI = {
        list: payload?.list || [],
        total: payload?.total,
      };
    });
    builder.addCase(fetchFeedNewsAPI.rejected, (state, { payload }) => {
      state.feedNewsAPI = initialState.feedNewsAPI;
    });
    builder.addCase(fetchNewYorkTimesAPI.fulfilled, (state, { payload }) => {
      state.feedNewyorkTimes = {
        list: payload?.list || [],
        total: payload?.total,
      };
    });
    builder.addCase(fetchGuardianAPI.fulfilled, (state, { payload }) => {
      state.feedGuardian = {
        list: payload?.list || [],
        total: payload?.total,
      };
    });
  },
});

export const { resetFeed } = newsSlice.actions;

export default newsSlice.reducer;
