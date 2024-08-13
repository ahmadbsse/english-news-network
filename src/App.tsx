import "bootstrap/dist/css/bootstrap.min.css";
import NewsFeed from "./features/newsFeed";
import UserPreferences from "./features/preferences";
import SiteHeader from "../src/components/header";
import SiteMenu from "../src/components/menu";
import { URL_NEWS_FEED, URL_PREFERENCES } from "./constants";
import history from "./services/historyService";
import { Switch, Router, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router history={history}>
        <SiteHeader />
        <SiteMenu />
        <Switch>
          <Route exact path={URL_NEWS_FEED} component={NewsFeed} />
          <Route exact path={URL_PREFERENCES} component={UserPreferences} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
