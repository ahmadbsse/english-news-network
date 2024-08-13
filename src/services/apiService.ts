import { URL_SOURCES_NEWS_API } from "../constants";
import { FeedFilterParams, FetchApiResponse, NewsSources } from "../interfaces";
import { addSourceInfo, filterItems } from "../utils/feedUtil";
import { generateUrl } from "../utils/urlUtil";
import request from "./apiRequest";

export const getFeedFromNewsAPI = async (
  params: FeedFilterParams
): Promise<FetchApiResponse> => {
  const response = await request({
    url: generateUrl(NewsSources.newsApi, params),
  });
  const data = addSourceInfo(
    response.data?.articles || [],
    NewsSources.newsApi
  );
  const filteredData = filterItems(data, params) || [];

  return {
    data: filteredData,
    total: response.data?.totalResults || 0,
  };
};

export const getFeedFromGuardian = async (
  params: FeedFilterParams
): Promise<FetchApiResponse> => {
  const response = await request({
    url: generateUrl(NewsSources.guardian, params),
  });
  const data = addSourceInfo(
    response.data?.response?.results || [],
    NewsSources.guardian
  );
  const filteredData = filterItems(data, params);

  return {
    data: filteredData,
    total: response.data?.response?.total || 0,
  };
};

export const getFeedFromNYT = async (
  params: FeedFilterParams
): Promise<FetchApiResponse> => {
  const response = await request({
    url: generateUrl(NewsSources.nyt, params),
  });
  const data = addSourceInfo(
    response.data?.response?.docs || [],
    NewsSources.nyt
  );
  const filteredData = filterItems(data, params);

  return { data: filteredData, total: filteredData.length };
};

export const getAllSourcesFromNewsAPI = async (): Promise<any> => {
  const response = await request({
    url: URL_SOURCES_NEWS_API,
  });

  return response.data?.sources || [];
};
