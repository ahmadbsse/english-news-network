import { RootState } from "../rootReducer";
import { createSelector } from "reselect";

const nytFeedSelector = (state: RootState) =>
  state.news.feedNewyorkTimes?.list || [];
const newsApiFeedSelector = (state: RootState) =>
  state.news.feedNewsAPI?.list || [];
const guardianFeedSelector = (state: RootState) =>
  state.news.feedGuardian?.list || [];

export const getNewsFeedSorted = createSelector(
  [newsApiFeedSelector, guardianFeedSelector, nytFeedSelector],
  (newsApiFeed, guardianFeed, nytFeed) =>
    [...nytFeed, ...guardianFeed, ...newsApiFeed].sort(
      (x, y) => y.timestamp - x.timestamp
    )
);

const nytTotalSelector = (state: RootState) =>
  state.news.feedNewyorkTimes?.total || 0;
const newsApiTotalSelector = (state: RootState) =>
  state.news.feedNewsAPI?.total || 0;
const guardianTotalSelector = (state: RootState) =>
  state.news.feedGuardian?.total || 0;

export const getTotalNewsRecords = createSelector(
  [guardianTotalSelector, nytTotalSelector, newsApiTotalSelector],
  (guardianTotal, nytTotal, newsApiTotal) =>
    guardianTotal + nytTotal + newsApiTotal
);
