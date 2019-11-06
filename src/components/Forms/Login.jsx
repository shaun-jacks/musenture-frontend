import React, { Component } from "react";
import styled from "styled-components";
import FacebookLogin from "react-facebook-login";
import { TiSocialFacebook } from "react-icons/ti/";
import { IconContext } from "react-icons";
import { handleLogin } from "../../services/auth";

class Login extends Component {
  state = {};

  handleFacebookLogin = async response => {
    await handleLogin(
      response.accessToken,
      "http://localhost:5000",
      "facebook"
    );
    const loggedIn = isLoggedIn();
    console.log(loggedIn);
    this.setState({ loggedIn });
  };

  render() {
    return (
      <div>
        <FacebookLogin
          appId="541947029940437"
          fields="name"
          callback={this.props.handleFacebookLogin}
          disableMobileRedirect={true}
        />
      </div>
    );
  }
}

export default Login;
