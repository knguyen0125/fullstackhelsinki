import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import LoginView from "../views/LoginView";
import BlogListView from "../views/BlogListView";
import BlogView from "../views/BlogView";
import { connect } from "react-redux";
import UserListView from "../views/UserListView";
import UserView from "../views/UserView";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location, authenticated }
            }}
          />
        )
      }
    />
  );
};

const Router = props => (
  <Switch>
    <PrivateRoute
      exact
      path={"/"}
      component={BlogListView}
      authenticated={props.loggedUser !== null}
    />

    <PrivateRoute
      exact
      path={"/blogs"}
      authenticated={props.loggedUser !== null}
      component={BlogListView}
    />

    <PrivateRoute
      path={"/blogs/:id"}
      authenticated={props.loggedUser !== null}
      component={BlogView}
    />

    <PrivateRoute
      exact
      path={"/users"}
      component={UserListView}
      authenticated={props.loggedUser !== null}
    />

    <PrivateRoute
      path={"/users/:id"}
      component={UserView}
      authenticated={props.loggedUser !== null}
    />

    <Route path={"/login"} component={LoginView} />
  </Switch>
);

export default connect(state => ({
  loggedUser: state.loggedUser
}))(Router);
