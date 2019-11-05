import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./templates/Layout";
import Home from "./pages/Home";
import Jams from "./pages/Jams";
import Me from "./pages/Me";
import Login from "./pages/Login";

class App extends Component {
  state = {};
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

export default App;
