import { FeedFilterParams, NewsSources } from "../interfaces";
import { RootState } from "../rootReducer";

export const addSourceInfo = (feed: object[], source: NewsSources) =>
  feed.map((item: object) => ({
    ...item,
    source,
  }));

export const transformFiltersToNewsAPIParams = (filters: FeedFilterParams) => {
  const data = {
    page: filters.page || 1,
    ...(filters.keyword ? { q: filters.keyword } : {}),
  };

  return data;
};

export const filterItems = (data, params: FeedFilterParams) => {
  const { categories, authors, dated } = params;
  let list = [...data];

  if (dated) {
    list = list.filter((item) => {
      const date = item.webPublicationDate || item.pub_date || item.publishedAt;
      const dateValue = date ? date.substring(0, date.indexOf("T")) : "";

      return dateValue === dated;
    });
  }

  if (categories?.length) {
    list = list.filter(
      ({ pillarName = "", news_desk = "" }) =>
        !!categories?.find(
          ({ id = "", name = "" }) =>
            (id || name).toLowerCase() ===
            (pillarName || news_desk).toLowerCase()
        )
    );
  }

  if (authors?.length) {
    list = list.filter(
      ({ author, source, id: guardianItemId }) =>
        !!authors?.find(({ id = "", name = "" }) =>
          author
            ? (id || name)?.toLowerCase() === author?.toLowerCase()
            : (id || name) === NewsSources.guardian && guardianItemId
        )
    );
  }

  return list;
};

export const enhanceFetchFeedParams = (
  state: RootState,
  params: FeedFilterParams
) => {
  const { categories, authors, dated = "" } = state.filters;

  return {
    ...params,
    categories,
    authors,
    dated,
  };
};
