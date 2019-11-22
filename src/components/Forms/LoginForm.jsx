import React, { Component } from "react";
import styled from "styled-components";
import Error from "../Messages/Error";
import Success from "../Messages/Success";
import { handleLocalLogin, resetLoginForm } from "../../actions/auth";
import { asyncActions } from "../../redux/modules/local/auth";
import { handleFetchMe } from "../../actions/me";
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
      color: white;
    }
    input:focus {
      outline: 0;
      outline-color: transparent;
      outline-style: none;
      border: 1px solid var(--bg);
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

  render() {
    return (
      <div>
        {this.props.auth.loading && <div>Logging in User...</div>}
        {this.props.auth.loginSuccess && <Success>User logged in!</Success>}
        {this.props.auth.error && (
          <Error>Error logging in user... {this.props.auth.error}</Error>
        )}
        <FormWrapper>
          <form
            onSubmit={async e => {
              e.preventDefault();
              await this.props.login(
                this.state.inputs.email,
                this.state.inputs.password
              );
              // if (this.props.auth.isAuthenticated) {
              //   // Redirect to Me page
              //   this.props.push("/me");
              // }
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
  push,
  handleFetchMe,
  handleLocalLogin,
  login: asyncActions.login,
  resetLoginForm
})(LoginForm);
