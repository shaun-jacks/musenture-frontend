import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/auth";
import { loginSuccess, loginError } from "./actions/auth";
import Layout from "./templates/Layout";
import Home from "./pages/Home";
import Jams from "./pages/Jams";
import Me from "./pages/Me";
import Login from "./pages/Login";

class App extends Component {
  componentDidMount() {
    // Persist login state
    if (localStorage.token) {
      try {
        const token = localStorage.token;
        const user = jwt_decode(token);
        // Set auth token in header for all new post requests
        setAuthToken(token);
        // Set token to localStorage
        this.props.loginSuccess(user);
      } catch (err) {
        console.log(err);
        this.props.loginError(err);
      }
    }
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/jams" component={Jams} />
          <Route path="/me" component={Me} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    );
  }
}

export default connect(
  null,
  { loginSuccess, loginError }
)(App);
