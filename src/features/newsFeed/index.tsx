import "./newsFeed.scss";
import {
  getAction,
  getShowLoader,
  RequestState,
} from "../../reducers/requestReducer";
import NewsCard from "../../components/newsCard";
import FeedFilters from "../filters";
import LoaderView from "../../components/loadingIndicator";
import useFetchNews from "../../hooks/useFetchNews";
import { Col, Row } from "react-bootstrap";
import Pagination from "../../components/pagination";
import { resetFeed } from "./newsSlice";
import { RootState } from "../../rootReducer";
import {
  ACTION_FETCH_FEED_GUARDIAN,
  ACTION_FETCH_FEED_NEWS_API,
  ACTION_FETCH_FEED_NYT,
} from "../../constants";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import { connect } from "react-redux";
import { useEffect } from "react";
import ErrorMessage from "../../components/errorMessage";
import { getTotalNewsRecords } from "../../selectors/newsSelector";
import { useAppSelector } from "../../hooks/hooks";
import { IdNameSummary } from "../preferences/preferencesSlice";

interface IProps {
  dated?: string;
  showLoader: boolean;
  categories: IdNameSummary[];
  sources: IdNameSummary[];
  authors: IdNameSummary[];
  actionFetchFeedNYT: RequestState;
  actionFetchFeedNewsAPI: RequestState;
  actionFetchFeedGuardian: RequestState;
  resetFeed: () => void;
}

const NewsFeed = ({
  showLoader,
  dated,
  categories,
  sources,
  authors,
  actionFetchFeedNYT,
  actionFetchFeedNewsAPI,
  actionFetchFeedGuardian,
  resetFeed,
}: IProps) => {
  const { search } = useLocation();
  const { keyword = "" } = parse(search);
  const total = useAppSelector((state) => getTotalNewsRecords(state));

  useEffect(() => {
    return () => resetFeed();
  }, [resetFeed]);

  const [list = []] = useFetchNews(keyword as string);
  const errorMessages = [
    actionFetchFeedNYT?.error,
    actionFetchFeedGuardian?.error,
    actionFetchFeedNewsAPI?.error,
  ].filter((message) => message);

  return (
    <div className="news-feed tabbed-content container-lg">
      {errorMessages.map((message) => (
        <ErrorMessage text={message} key={message} />
      ))}
      <FeedFilters />
      {showLoader ? (
        <LoaderView show={true} />
      ) : (
        <>
          {list.length > 0 && (
            <Row className="g-4">
              <Col>
                <p className="list-legend">
                  <strong>
                    Total news records:{" "}
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(total)}
                  </strong>
                </p>
              </Col>
            </Row>
          )}
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {list.length > 0 ? (
              list.map((item, index) => (
                <NewsCard data={item} key={"item" + index} />
              ))
            ) : (
              <Col>
                <strong className="d-flex feed-no-results">
                  No data available
                </strong>
              </Col>
            )}
          </Row>
          <Row className="g-4">
            <Col>
              <Pagination />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  dated: state.filters.dated,
  categories: state.filters.categories,
  sources: state.filters.sources,
  authors: state.filters.authors,
  showLoader:
    getShowLoader(ACTION_FETCH_FEED_GUARDIAN) ||
    getShowLoader(ACTION_FETCH_FEED_NYT) ||
    getShowLoader(ACTION_FETCH_FEED_NEWS_API),
  actionFetchFeedGuardian: getAction(ACTION_FETCH_FEED_GUARDIAN),
  actionFetchFeedNYT: getAction(ACTION_FETCH_FEED_NYT),
  actionFetchFeedNewsAPI: getAction(ACTION_FETCH_FEED_NEWS_API),
});

const mapDispatchToProps = {
  resetFeed,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
