import { NewsSources } from "./interfaces";

export const URL_NEWS_API =
  "https://newsapi.org/v2/top-headlines?apiKey=8144b9562f9e4ae590dbf6526992b16f&language=en&pageSize=10";
export const URL_GUARDIAN =
  "https://content.guardianapis.com/search?api-key=03520a26-989c-4e38-b529-1164e5d7bc89&format=json&pageSize=10";
export const URL_NEW_YORK_TIMES =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=Fc0260XG194vc31AQIZY3268AhTGikip";

export const URL_SOURCES_NEWS_API =
  "https://newsapi.org/v2/top-headlines/sources?apiKey=8144b9562f9e4ae590dbf6526992b16f&language=en";

export const URL_NEWS_FEED = "/feed";
export const URL_PREFERENCES = "/preferences";

export const PAGE_SIZE = 30;
export const PAGE_SIZE_PER_SERVICE = 10;

export const MAX_FEED_RECORDS_COUNT = 1000+1000+33 //restriction of developer accont

export const DEFAULT_PREFERRED_NEWS_SOURCES = [
  { id: NewsSources.guardian, name: NewsSources.guardian },
  { id: NewsSources.nyt, name: NewsSources.nyt },
  { id: NewsSources.newsApi, name: NewsSources.newsApi },
];

export const ACTION_FETCH_FEED_NEWS_API = "feed/news-api"
export const ACTION_FETCH_FEED_NYT = "feed/nyt-api"
export const ACTION_FETCH_FEED_GUARDIAN = "feed/guardian-api"