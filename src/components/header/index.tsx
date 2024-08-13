import "./header.scss";
import Search from "../search";
import { URL_NEWS_FEED } from "../../constants";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const SiteHeader = () => {
  return (
    <header className="site-header">
      <div className="container-lg">
        <Row className="g-4" xs={2} sm={2}>
          <Col xs={12} sm={3} className="align-content-sm-center">
            <a href={URL_NEWS_FEED}>The News</a>
          </Col>
          <Col xs={12} sm={{ span: 9 }} lg={{ offset: 1, span: 8 }}>
            <Search />
          </Col>
        </Row>
      </div>
    </header>
  );
};

export default SiteHeader;
