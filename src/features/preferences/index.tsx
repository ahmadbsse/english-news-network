import "./preferences.scss";
import useFetchPreferencesOptions from "../../hooks/useFetchFilterOptions";
import PreferenceControl from "../../components/filterControl";
import { RootState } from "../../rootReducer";
import {
  IdNameSummary,
  addPreferredAuthor,
  addPreferredCategory,
  addPreferredSource,
  removePreferredAuthor,
  removePreferredSource,
  removePreferredCategory,
} from "./preferencesSlice";
import {
  addPreferredSourceToFilters,
  removePreferredSourceFromFilters,
  addPreferredCategoryToFilters,
  addPreferredAuthorToFilters,
  removePreferredAuthorFromFilters,
  removePreferredCategoryFromFilters,
} from "../filters/filtersSlice";
import { connect } from "react-redux";
import { ListGroup, Row } from "react-bootstrap";
import { getPlaceholdersText } from "../../utils/filtersUtil";

interface IProps {
  preferredSources?: IdNameSummary[];
  sources?: IdNameSummary[];
  preferredCategories?: IdNameSummary[];
  categories?: IdNameSummary[];
  preferredAuthors?: IdNameSummary[];
  addPreferredAuthor: (item: IdNameSummary) => void;
  addPreferredCategory: (item: IdNameSummary) => void;
  addPreferredSource: (item: IdNameSummary) => void;
  removePreferredAuthor: (item: IdNameSummary) => void;
  removePreferredSource: (item: IdNameSummary) => void;
  removePreferredCategory: (item: IdNameSummary) => void;
  addPreferredSourceToFilters: (item: IdNameSummary) => void;
  addPreferredAuthorToFilters: (item: IdNameSummary) => void;
  removePreferredSourceFromFilters: (item: IdNameSummary) => void;
  addPreferredCategoryToFilters: (item: IdNameSummary) => void;
  removePreferredAuthorFromFilters: (item: IdNameSummary) => void;
  removePreferredCategoryFromFilters: (item: IdNameSummary) => void;
}

const Preferences = ({
  preferredSources = [],
  preferredCategories = [],
  preferredAuthors = [],
  addPreferredAuthor,
  addPreferredCategory,
  addPreferredSource,
  removePreferredAuthor,
  removePreferredSource,
  removePreferredCategory,
  addPreferredSourceToFilters,
  addPreferredAuthorToFilters,
  removePreferredSourceFromFilters,
  addPreferredCategoryToFilters,
  removePreferredAuthorFromFilters,
  removePreferredCategoryFromFilters
}: IProps) => {
  const [sources, categories, authors] = useFetchPreferencesOptions();
  const onAddPreferredSource = (
    items: IdNameSummary[],
    selectedItem: IdNameSummary
  ) => {
    addPreferredSource(selectedItem);
    addPreferredSourceToFilters(selectedItem);
  };

  const onRemovePreferredSource = (
    items: IdNameSummary[],
    removedItem: IdNameSummary
  ) => {
    removePreferredSource(removedItem);
    removePreferredSourceFromFilters(removedItem);
  };

  const onAddPreferredCategory = (
    items: IdNameSummary[],
    selectedItem: IdNameSummary
  ) => {
    addPreferredCategory(selectedItem);
    addPreferredCategoryToFilters(selectedItem);
  };
  const onRemovePreferredCategory = (
    items: IdNameSummary[],
    removedItem: IdNameSummary
  ) => {
    removePreferredCategory(removedItem);
    removePreferredCategoryFromFilters(removedItem);
  };

  const onAddPreferredAuthor = (
    items: IdNameSummary[],
    selectedItem: IdNameSummary
  ) => {
    addPreferredAuthor(selectedItem);
    addPreferredAuthorToFilters(selectedItem);
  };
  const onRemovePreferredAuthor = (
    items: IdNameSummary[],
    removedItem: IdNameSummary
  ) => {
    removePreferredAuthor(removedItem);
    removePreferredAuthorFromFilters(removedItem);
  };

  return (
    <div className="user-preferences tabbed-content container-lg">
      <p className="tab-title">Preferences</p>
      <Row className="g-4">
        <ListGroup variant="flush">
          <ListGroup.Item className="pb-0">
            <PreferenceControl
              title="Select Preferred Sources"
              placeholder={getPlaceholdersText(
                "source",
                sources?.length || 0,
                preferredSources.length || 0
              )}
              options={sources}
              selectedValues={preferredSources || []}
              onAdd={onAddPreferredSource}
              onRemove={onRemovePreferredSource}
            />
          </ListGroup.Item>
          <ListGroup.Item className="pb-0">
            <PreferenceControl
              title="Select Preferred Categories"
              placeholder={getPlaceholdersText(
                "category",
                categories?.length || 0,
                preferredCategories.length || 0,
                "categories"
              )}
              options={categories}
              selectedValues={preferredCategories}
              onAdd={onAddPreferredCategory}
              onRemove={onRemovePreferredCategory}
            />
          </ListGroup.Item>
          <ListGroup.Item className="pb-0">
            <PreferenceControl
              title="Select Preferred Authors"
              options={authors}
              placeholder={getPlaceholdersText(
                "author",
                authors?.length || 0,
                preferredAuthors.length || 0
              )}
              selectedValues={preferredAuthors}
              onAdd={onAddPreferredAuthor}
              onRemove={onRemovePreferredAuthor}
            />
          </ListGroup.Item>
        </ListGroup>
      </Row>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  preferredAuthors: state.preferences.preferredAuthors,
  preferredCategories: state.preferences.preferredCategories,
  preferredSources: state.preferences.preferredSources,
  sources: state.filters.sources,
  categories: state.filters.categories,
});

const mapDispatchToProps = {
  addPreferredAuthor,
  addPreferredCategory,
  addPreferredSource,
  removePreferredAuthor,
  removePreferredSource,
  removePreferredCategory,
  addPreferredSourceToFilters,
  removePreferredAuthorFromFilters,
  removePreferredSourceFromFilters,
  removePreferredCategoryFromFilters,
  addPreferredCategoryToFilters,
  addPreferredAuthorToFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
