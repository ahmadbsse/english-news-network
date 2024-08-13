import { Card, Col } from "react-bootstrap";
import "./newsCard.scss";
import { FeedItem, NewsSources } from "../../interfaces";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(relativeTime);

interface IProps {
  data: FeedItem;
}

const NewsCard = ({ data }: IProps) => {
  return (
    <Col>
      <a
        href={data.link}
        target="_blank"
        rel="noreferrer"
        className="feed-card"
      >
        <Card border="dark" className="h-100">
          <Card.Img variant="top" src={data.imageUrl} />
          <small className="text-api-name">
            <strong>Source:&nbsp;</strong>
            {data.source}
          </small>
          {data.source === NewsSources.newsApi &&
            data.source !== data.originalSource && (
              <p className="text-src mb-0">
                <span className="src-title">Original Source</span>
                {data.originalSource}
              </p>
            )}
          <Card.Body>
            <Card.Text>
              {data.category ? (
                <small className="news-category">#{data.category}</small>
              ) : (
                <></>
              )}
              <p className="news-title mb-0" title={data.fullTitle}>
                <strong>{data.title}</strong>
              </p>
              <small className="text-muted">
                <span className="news-author">
                  - {data.author}
                </span>{" "}
                |{" "}{dayjs(data.timestamp).local().fromNow()}
              </small>
            </Card.Text>
          </Card.Body>
        </Card>
      </a>
    </Col>
  );
};

export default NewsCard;
