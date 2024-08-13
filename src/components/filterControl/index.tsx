import "./filterControl.scss";
import { IdNameSummary } from "../../features/preferences/preferencesSlice";
import Multiselect from "multiselect-react-dropdown";

interface IProps {
  title?: string;
  placeholder?: string;
  options?: IdNameSummary[];
  selectedValues?: IdNameSummary[];
  onAdd: (items: IdNameSummary[], item: IdNameSummary) => void;
  onRemove: (items: IdNameSummary[], item: IdNameSummary) => void;
}

const FilterControl = ({
  title,
  placeholder,
  options = [],
  selectedValues = [],
  onAdd,
  onRemove,
}: IProps) => {
  const optionsList = options.filter(({ name }) => !!name.trim());
  const sortedOptions = [...optionsList].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { ignorePunctuation: true })
  );

  return (
    <>
      {title && <p className="control-label">{title}</p>}
      <Multiselect
        options={sortedOptions}
        selectedValues={selectedValues}
        onSelect={onAdd}
        onRemove={onRemove}
        displayValue="name"
        avoidHighlightFirstOption={true}
        showCheckbox={true}
        showArrow={true}
        {...(placeholder ? { placeholder } : {})}
      />
    </>
  );
};

export default FilterControl;
