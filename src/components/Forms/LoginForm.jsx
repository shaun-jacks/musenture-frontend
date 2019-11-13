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

const FormWrapper = styled.div`
  padding: 1em;

  form {
    label {
      color: var(--bgButtons);
    }
    input {
      width: 100%;
      padding: 12px 20px;
      border-radius: 5px;
      border: none;
      margin: 8px 0;
      box-sizing: border-box;
      background-color: var(--bgAccent);
    }
    input:focus {
      outline: 0;
      outline-color: transparent;
      outline-style: none;
      border: 3px solid var(--bgButtons);
    }
    button {
      border: none;
      background-color: var(--bg);
    }
  }
`;

class LoginForm extends Component {
  state = {
    inputs: {
      email: "",
      password: ""
    }
  };
  componentDidMount() {
    this.props.resetLoginForm();
  }

  handleInputChange = e => {
    this.setState({
      ...this.state,
      inputs: {
        ...this.state.inputs,
        [e.target.name]: e.target.value
      }
    });
  };

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
        {this.props.auth.loading && <div>Logging in User...</div>}
        {this.props.auth.loginSuccess && (
          <div
            style={{ color: "#4F8A10", background: "#DFF2BF", padding: "1em" }}
          >
            User logged in!
          </div>
        )}
        {this.props.auth.error && (
          <div
            style={{ color: "#D8000C", background: "#FFD2D2", padding: "1em" }}
          >
            Error logging in user... {this.props.auth.error}
          </div>
        )}
        <FormWrapper>
          <form
            onSubmit={async e => {
              e.preventDefault();
              await this.props.handleLocalLogin(
                this.state.inputs.email,
                this.state.inputs.password
              );
              console.log(this.props.auth.isAuthenticated);
              if (this.props.auth.isAuthenticated) {
                await this.props.handleFetchMe(
                  "http://localhost:3000/users/me"
                );
                console.log(this.props);
                // Redirect to Me page
                this.props.push("/me");
              }
            }}
          >
            <div>
              <label>Email Address</label>
              <input
                type="text"
                name="email"
                placeholder="Enter Email Address..."
                onChange={this.handleInputChange}
                value={this.state.inputs.email}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password..."
                onChange={this.handleInputChange}
                value={this.state.inputs.password}
                name="password"
              />
            </div>
            <button type="submit">
              <TextButton text={"Login"} />
            </button>
          </form>
        </FormWrapper>
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
  handleFetchMe,
  handleLocalLogin,
  resetLoginForm
})(LoginForm);
