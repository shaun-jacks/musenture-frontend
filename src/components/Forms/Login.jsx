import React, { Component } from "react";
import styled from "styled-components";
import FacebookLogin from "react-facebook-login";
import { TiSocialFacebook } from "react-icons/ti/";
import { IconContext } from "react-icons";
import { handleFacebookLogin } from "../../actions/auth";
import { connect } from "react-redux";

class LoginForm extends Component {
  state = {};

  FacebookLogin = async response => {
    const res = await this.props.handleFacebookLogin(
      response.accessToken,
      "http://localhost:3000/users/auth/facebook"
    );
    console.log(res);
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

export default connect(
  null,
  { handleFacebookLogin }
)(LoginForm);
