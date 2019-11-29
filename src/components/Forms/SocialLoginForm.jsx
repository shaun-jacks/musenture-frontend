import React, { Component } from "react";
import styled from "styled-components";
import FacebookLogin from "react-facebook-login";
import { TiSocialFacebook } from "react-icons/ti/";
import { IconContext } from "react-icons";
import {
  handleFacebookLogin,
  handleLocalLogin,
  resetLoginForm
} from "../../actions/auth";
import { handleFetchMe, handleFetchMeJams } from "../../actions/me";
import TextButton from "../Buttons/TextButton";
import { connect } from "react-redux";
import { push } from "connected-react-router";

class SocialLoginForm extends Component {
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
        <div>
          {/* <FacebookLogin
            appId="541947029940437"
            fields="name"
            callback={this.FacebookLogin}
            disableMobileRedirect={true}
            textButton={"Continue with Facebook"}
          /> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {
  handleFacebookLogin,
  push,
  handleFetchMe
})(SocialLoginForm);
