import { IdNameSummary } from "../features/preferences/preferencesSlice";
import { NewsCategory, NewsSource } from "../interfaces";

export const mapNewsSources = (sources: IdNameSummary[]) => {
  return sources.map(({ id, name }) => ({
    id: id || name,
    name,
  }));
};

export const mapNewsCategories = (sources: NewsCategory[]) => {
  const categories = new Set<string>();
  sources.forEach(({ category = "", news_desk = "", pillarName = "" }) => {
    categories.add(category || news_desk || pillarName || "");
  });
  return Array.from(categories).map((category) => ({
    id: category,
    name: category,
  }));
};

export const mapNewsAuthors = (sources: NewsSource[]) => {
  const authors = new Set<string>();
  sources.forEach(({ author = "" }) => {
    authors.add(author || "");
  });
  return Array.from(authors).map((author) => ({
    id: author,
    name: author,
  }));
};
