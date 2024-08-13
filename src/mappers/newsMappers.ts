import { FeedItem, NewsSources } from "../interfaces";

export const transformFeed = (feed): FeedItem[] => {
  const data = feed.map((item, i) => {
    const date = item.webPublicationDate || item.pub_date || item.publishedAt;
    const title = item.webTitle || item.headline?.main || item.title || "";
    const newsTitle = item.author
      ? title.substring(0, title.indexOf(` - ${item.author}`))
      : title;

    return {
      id: item.id || item._id || `news-item-${i}`,
      source: item.id
        ? NewsSources.guardian
        : item._id
        ? NewsSources.nyt
        : NewsSources.newsApi,
      originalSource: item.source,
      dated: date ? date.substring(0, date.indexOf("T")) : "",
      title: `${newsTitle.substring(0, 50)}${
        newsTitle.length > 80 ? "..." : ""
      }`,
      fullTitle: title,
      timestamp: new Date(date).getTime(),
      link: item.webUrl || item.web_url || item.url || "",
      author:
        item.author ||
        (item.byline !== undefined ? item.byline.original : NewsSources.nyt) ||
        NewsSources.guardian,
      category: item.pillarName || item.news_desk || "",
      imageUrl:
        item.urlToImage ||
        (item.multimedia?.length
          ? `https://www.nytimes.com/${item?.multimedia[0]?.url || ""}`
          : "") ||
        "/images/news-bg.jpg",
    };
  });

  return data;
};
