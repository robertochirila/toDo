import { Meteor } from "meteor/meteor";
import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "../../client/imports/react_spa/Login";
import Signup from "../../client/imports/react_spa/Signup";
import App from "../../client/imports/react_spa/App";
import createHistory from "history/createBrowserHistory";

const history = createHistory();
const unauthenticatedPages = ["/", "signup"];
const authenticatedPages = ["/home"];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    console.log("You are logged in!");
    history.push("/home");
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    console.log("Not logged in!");
    history.push("/");
    //window.location.reload();
  }
};

export const onAuthentificationChange = isAuthenticated => {
  // takes the url and checks if you are on a public or private page
  // if you are logged in the router routes to the home page
  // otherwise is takes you to the login page
  const pathName = window.location.pathname;
  const isAuthenticatedPage = authenticatedPages.includes(pathName);
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  if (isUnauthenticatedPage && isAuthenticated) {
    history.push("/home");
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.push("/");
  }
  console.log("isAuthenticated", isAuthenticated);
  console.log(pathName);
  //window.location.reload();
};

export const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path={"/"} component={Login} onEnter={onEnterPublicPage()} />
      <Route
        exact
        path={"/signup"}
        component={Signup}
        onEnter={onEnterPublicPage()}
      />
      <Route
        exact
        path={"/home"}
        component={App}
        onEnter={onEnterPrivatePage()}
      />
    </Switch>
  </BrowserRouter>
);
