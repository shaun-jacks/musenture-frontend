import React, { Component } from "react";
import styled from "styled-components";
import FacebookLogin from "react-facebook-login";
import { TiSocialFacebook } from "react-icons/ti/";
import { IconContext } from "react-icons";
import { handleFacebookLogin } from "../../actions/auth";
import { handleFetchMe, handleFetchMeJams } from "../../actions/me";

import { connect } from "react-redux";
import { push } from "connected-react-router";

class LoginForm extends Component {
  state = {};

  FacebookLogin = async response => {
    await this.props.handleFacebookLogin(
      response.accessToken,
      "http://localhost:3000/users/auth/facebook"
    );
    await this.props.handleFetchMe("http://localhost:3000/users/me");
    console.log(this.props);
    // Redirect to Me page
    this.props.push("/me");
  };

  render() {
    return (
      <div>
        <FacebookLogin
          appId="541947029940437"
          fields="name"
          callback={this.FacebookLogin}
          disableMobileRedirect={true}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  null,
  { handleFacebookLogin, push, handleFetchMe }
)(LoginForm);
