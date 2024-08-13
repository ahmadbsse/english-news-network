import { IdNameSummary } from "./features/preferences/preferencesSlice";

export interface FeedItem {
  id: string;
  source: NewsSources;
  originalSource: string;
  dated: string;
  timestamp: number;
  title: string;
  fullTitle: string;
  author: string;
  link: string;
  category: string;
  imageUrl: string;
}

export interface FeedFilterParams {
  dated?: string;
  categories?: IdNameSummary[];
  authors?: IdNameSummary[];
  keyword?: string;
  page?: number;
}

export enum NewsSources {
  guardian = "The Guardian",
  nyt = "The New York Times",
  newsApi = "News API",
}

export interface FeedFilters {
  sources: IdNameSummary[];
  categories: IdNameSummary[];
  dated?: string;
}

export interface FetchApiResponse {
  data: unknown[];
  total: number;
}

export interface FeedList {
  list: FeedItem[];
  total: number;
}

export enum STATES {
  success = "success",
  pending = "pending",
  failed = "failed",
}

export interface NewsCategory {
  category?: string;
  news_desk?: string;
  pillarName?: string;
}

export interface NewsSource {
  author?: string;
}