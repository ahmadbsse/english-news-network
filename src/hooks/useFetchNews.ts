import {
  fetchFeedNewsAPI,
  fetchGuardianAPI,
  fetchNewYorkTimesAPI,
  resetFeed,
} from "../features/newsFeed/newsSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { addFilterToQuery } from "../utils/urlUtil";
import { getNewsFeedSorted } from "../selectors/newsSelector";
import { NewsSources } from "../interfaces";
import { parse } from "query-string";
import { useEffect, useRef } from "react";
import { resetAllFilters } from "../features/filters/filtersSlice";

const useNewsAPI = (keyword: string) => {
  const dispatch = useAppDispatch();
  const previousKeyword = useRef<string>("");

  const data = useAppSelector((state) => getNewsFeedSorted(state));
  const categories = useAppSelector((state) => state.filters.categories);
  const sources = useAppSelector((state) => state.filters.sources);
  const authors = useAppSelector((state) => state.filters.authors);
  const dated = useAppSelector((state) => state.filters.dated);

  const { page } = parse(window.location.search);
  const activePage = parseInt(page as string) || 1;

  useEffect(() => {
    if (keyword !== previousKeyword.current && activePage > 1) {
      addFilterToQuery(window.location.search, { page: 1 });
    } else {
      const params = {
        page: keyword !== previousKeyword.current ? 1 : activePage,
        dated,
        keyword,
      };
      if(keyword !== previousKeyword.current){
        dispatch(resetAllFilters())
      }
      const isAllSources = sources.length === 0;
      if (
        isAllSources ||
        sources.find(({ id }) => id === NewsSources.guardian)
      ) {
        dispatch(fetchGuardianAPI(params));
      }
      if (isAllSources || sources.find(({ id }) => id === NewsSources.nyt)) {
        dispatch(fetchNewYorkTimesAPI(params));
      }
      if (
        isAllSources ||
        sources.find(({ id }) => id === NewsSources.newsApi)
      ) {
        dispatch(fetchFeedNewsAPI(params));
      }

      previousKeyword.current = keyword;
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    
    return () => {
      dispatch(resetFeed());
    };
  }, [
    dispatch,
    activePage,
    dated,
    keyword,
    sources,
    authors.length,
    categories.length,
  ]);

  return [data];
};

export default useNewsAPI;
