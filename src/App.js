import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/auth";
import { loginSuccess, loginError, logoutUser } from "./actions/auth";
import { handleFetchMe, handleFetchMeJams } from "./actions/me";
import Layout from "./templates/Layout";
import Home from "./pages/Home";
import Jams from "./pages/Jams";
import Me from "./containers/Me";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./containers/Users";
import UserPage from "./pages/UserPage";

class App extends Component {
  componentDidMount() {
    console.log("Testing App.js ComponentDidMount");
    // Persist login state
    if (localStorage.token) {
      try {
        const token = localStorage.token;
        // Set auth token in header for all new post requests
        setAuthToken(token);
      } catch (err) {
        console.log(err);
        this.props.loginError(err);
      }
    } else {
      this.props.logoutUser();
    }
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/jams" exact component={Jams} />
          <Route
            path="/users/:userId"
            render={({ match }) => <UserPage userId={match.params.userId} />}
          />
          <Route path="/users" exact component={Users} />
          <Route path="/me" exact component={Me} />
          <Route path="/" exact component={Register} />
        </Switch>
      </Layout>
    );
  }
}

export default connect(null, {
  loginSuccess,
  loginError,
  handleFetchMe,
  handleFetchMeJams,
  logoutUser
})(App);
