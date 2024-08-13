import {
  fetchNewsAuthors,
  fetchNewsCategories,
  fetchNewsSources,
} from "../features/preferences/preferencesSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useEffect } from "react";

const useFetchFilterOptions = () => {
  const dispatch = useAppDispatch();
  const sources = useAppSelector((state) => state.preferences.sources);
  const categories = useAppSelector((state) => state.preferences.categories);
  const authors = useAppSelector((state) => state.preferences.authors);

  useEffect(() => {
    !sources?.length && dispatch(fetchNewsSources());
    !categories?.length && dispatch(fetchNewsCategories());
    !authors?.length && dispatch(fetchNewsAuthors());
  }, [dispatch, sources?.length, categories?.length, authors?.length]);

  return [sources, categories, authors];
};

export default useFetchFilterOptions;
