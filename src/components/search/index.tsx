import "./search.scss";
import { addFilterToQuery } from "../../utils/urlUtil";
import { Form, InputGroup } from "react-bootstrap";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

const SearchControl = () => {
  const [searchText, setSearchText] = useState("");
  const onChangeSearchInput = (e) => setSearchText(e.target.value);

  const [keyword] = useDebounce(searchText, 1000);

  useEffect(() => {
    addFilterToQuery(window.location.search, { keyword });
  }, [keyword]);

  const handleClearSearch = () => setSearchText("");

  return (
    <InputGroup className="feed-search mb-0">
      <InputGroup.Text id="basic-addon1" className="d-none d-sm-flex">
        <strong>Search</strong>
      </InputGroup.Text>
      <Form.Control
        placeholder="Type a keyword to search news"
        aria-label="Type a keyword to search news"
        aria-describedby="basic-addon1"
        value={searchText}
        onChange={onChangeSearchInput}
      />
      <InputGroup.Text id="basic-addon2">
        <button
          title="Reset search"
          className="btn-clear-search"
          onClick={handleClearSearch}
        >
          X
        </button>
      </InputGroup.Text>
    </InputGroup>
  );
};

export default SearchControl;
