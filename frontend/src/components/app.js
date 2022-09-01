// src/components/app.js
import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Route, Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import MainPageContainer from "./main/main_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import VenueIndexContainer from "../components/venues/venue_index_container";
import VenueShowContainer from "../components/venues/venue_show_container";
import crawlShowContainer from "./crawls/crawl_show_container";
import crawlIndexContainer from "./crawls/crawl_index_container";
import CrawlCreateContainer from "./crawls/crawl_create_container";
import CrawlEditContainer from "./crawls/crawl_edit_container";
import ProfileContainer from "./profile/profile_container";
import VenueCreate from "./venues/venue_create_container";

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <Route path="/users/:id" component={ProfileContainer} />
      <Route path="/venueShow/:id" component={VenueShowContainer} />
      <Route path="/crawl/:id" component={crawlShowContainer} />
      <Route path="/crawlCreate/" component={CrawlCreateContainer} />
      <Route path="/crawlEdit/" component={CrawlEditContainer} />
      <Route exact path="/venues" component={VenueIndexContainer} />
      <Route exact path="/venueCreate" component={VenueCreate} />
      <Route exact path="/crawls" component={crawlIndexContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <Route path="/" component={MainPageContainer} />
    </Switch>
  </div>
);

export default App;
