import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/auth";
import Layout from "./templates/Layout";
import Home from "./components/Pages/Home";
import Jams from "./containers/Pages/Jams";
import Me from "./containers/Pages/Me";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import Users from "./containers/Pages/Users";
import User from "./containers/Pages/User";
import { actions as authActions } from "./redux/modules/local/auth";

class App extends Component {
  componentDidMount() {
    console.log("Testing App.js ComponentDidMount");
    // Persist login state
    if (this.props.auth.accessToken) {
      try {
        const token = this.props.auth.accessToken;
        // Set auth token in header for all new post requests
        setAuthToken(token);
      } catch (err) {
        console.log(err);
      }
    } else {
      this.props.logout();
    }
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/jams" exact component={Jams} />
          <Route path="/users/:userId" exact component={User} />
          <Route path="/users" exact component={Users} />
          <Route path="/me" exact component={Me} />
          <Route path="/" exact component={Register} />
        </Switch>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  {
    logout: authActions.logout
  }
)(App);
