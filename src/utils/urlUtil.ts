import { NewsSources, FeedFilterParams } from "../interfaces";
import {
  URL_NEWS_API,
  URL_GUARDIAN,
  URL_NEW_YORK_TIMES,
  URL_NEWS_FEED,
} from "../constants";
import { transformFiltersToNewsAPIParams } from "./feedUtil";
import historyService from "../services/historyService";
import queryString from "query-string";

export const generateUrl = (
  source: NewsSources,
  queryParams: FeedFilterParams
) => {
  const params = transformFiltersToNewsAPIParams(queryParams);
  const query =
    Object.keys(params).length > 0 ? `&${queryString.stringify(params)}` : "";

  let baseUrl = "";
  switch (source) {
    case NewsSources.guardian:
      baseUrl = URL_GUARDIAN;
      break;
    case NewsSources.newsApi:
      baseUrl = URL_NEWS_API;
      break;
    case NewsSources.nyt:
      baseUrl = URL_NEW_YORK_TIMES;
      break;
  }

  return baseUrl + query;
  // }
};

export const addFilterToQuery = (location, queryParams) => {
  const urlParams = queryString.parse(location);
  const qString = queryString.stringify({ ...urlParams, ...queryParams });

  historyService.push(`${URL_NEWS_FEED}${qString ? `?${qString}` : ""}`);
};
