import "./pagination.scss";
import { MAX_FEED_RECORDS_COUNT, PAGE_SIZE } from "../../constants";
import { addFilterToQuery } from "../../utils/urlUtil";
import Paginate from "react-js-pagination";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import { getNewsFeedSorted, getTotalNewsRecords } from "../../selectors/newsSelector";
import { useAppSelector } from "../../hooks/hooks";

const Pagination = () => {
  const { search } = useLocation();
  const { page = 1 } = parse(search);

  const list = useAppSelector((state) => getNewsFeedSorted(state));
  const total = useAppSelector((state) => getTotalNewsRecords(state));
  const handleChange = (page: number) => addFilterToQuery(search, { page });

  return total > 0 && list.length > 0? (
    <div className="feed-pagination">
      <Paginate
        activePage={parseInt(page as string) || 1}
        itemsCountPerPage={PAGE_SIZE}
        totalItemsCount={
          total > MAX_FEED_RECORDS_COUNT ? MAX_FEED_RECORDS_COUNT : total
        }
        pageRangeDisplayed={5}
        onChange={handleChange}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  ) : <></>;
};

export default Pagination;
