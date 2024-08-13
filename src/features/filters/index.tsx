import "./filters.scss";
import FiltersControl from "../../components/filterControl";
import useFetchPreferencesOptions from "../../hooks/useFetchFilterOptions";
import { RootState } from "../../rootReducer";
import { IdNameSummary } from "../preferences/preferencesSlice";
import {
  resetAllFilters,
  setDateFilter,
  updateFilters,
} from "../filters/filtersSlice";
import { getPlaceholdersText } from "../../utils/filtersUtil";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";

interface IProps {
  updateFilters: (filters) => void;
  setDateFilter: (date: string) => void;
  resetAllFilters: () => void;

  sources: IdNameSummary[];
  categories: IdNameSummary[];
  authors: IdNameSummary[];
  
  dated?: string;
}
const FeedFilterParams = ({
  sources = [],
  categories = [],
  authors=[],
  dated = "",
  updateFilters,
  setDateFilter,
  resetAllFilters,
}: IProps) => {
  const [sourceOptions, categoryOptions, authorOptions] = useFetchPreferencesOptions();

  const onAddRemove = (
    key: string,
    items: IdNameSummary[],
    source: IdNameSummary
  ) =>
    updateFilters({
      [key]: items,
    });
  const onAddRemoveSource = onAddRemove.bind(null, "sources");
  const onAddRemoveCategory = onAddRemove.bind(null, "categories");
  const onAddRemoveAuthor = onAddRemove.bind(null, "authors");
  const handleChangeDate = (e) => setDateFilter(e.target.value);

  return (
      <Row className="feed-filters g-4" xs={1} sm={1} md={4}>
        <Col xs={12} sm={6} md={6} lg={3} className="g-4">
          {sources && (
            <FiltersControl
              options={sourceOptions}
              selectedValues={sources.length <= 2 ? [...sources] : []}
              onAdd={onAddRemoveSource}
              onRemove={onAddRemoveSource}
              placeholder={getPlaceholdersText(
                "source",
                sourceOptions?.length || 0,
                sources.length || 0
              )}
              title="Filter by Source"
            />
          )}
        </Col>
        <Col xs={12} sm={6} md={6}  lg={3} className="g-4">
          {categories && (
            <FiltersControl
              options={categoryOptions}
              selectedValues={[...categories]}
              onAdd={onAddRemoveCategory}
              onRemove={onAddRemoveCategory}
              placeholder={getPlaceholdersText(
                "category",
                categoryOptions?.length || 0,
                categories.length || 0,
                "categories"
              )}
              title="Filter by Category"
            />
          )}
        </Col>
        <Col xs={12} sm={6} md={6} lg={3}className="g-4">
          {authors && (
            <FiltersControl
              options={authorOptions}
              selectedValues={[...authors]}
              onAdd={onAddRemoveAuthor}
              onRemove={onAddRemoveAuthor}
              placeholder={getPlaceholdersText(
                "author",
                authorOptions?.length || 0,
                authors.length || 0
              )}
              title="Filter by Author"
            />
          )}
        </Col>
        <Col xs={12} sm={6} lg={3} className="g-4">
          <p className="control-label">Filter by Date</p>
          <div className="d-flex align-items-center flex-grow-1">
            <input
              className="searchWrapper input-date"
              type="date"
              value={dated}
              key={dated}
              onChange={handleChangeDate}
            />
            <button
              className="btn-clear-filters searchWrapper"
              onClick={resetAllFilters}
            >
              Reset
            </button>
          </div>
        </Col>
      </Row>
  );
};

const mapStateToProps = (state: RootState) => ({
  sources: state.filters.sources,
  categories: state.filters.categories,
  authors: state.filters.authors,
  dated: state.filters.dated,
});

const mapDispatchToProps = {
  resetAllFilters,
  setDateFilter,
  updateFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedFilterParams);
