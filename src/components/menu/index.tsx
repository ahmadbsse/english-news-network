import "./menu.scss";
import { URL_NEWS_FEED, URL_PREFERENCES } from "../../constants";
import { Link, useLocation } from "react-router-dom";
import { Nav, Row } from "react-bootstrap";

const SiteNav = () => {
  const location = useLocation();

  return (
    <div className="container-lg">
      <Row>
        <Nav
          variant="tabs"
          activeKey={
            location.pathname === "/" ? URL_NEWS_FEED : location.pathname
          }
          className="site-menu"
        >
          <Nav.Item className="mt-xs-4">
            <Nav.Link as={Link} to={URL_NEWS_FEED} eventKey={URL_NEWS_FEED}>
              News Feed
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={URL_PREFERENCES} eventKey={URL_PREFERENCES}>
              Preferences
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
    </div>
  );
};

export default SiteNav;
