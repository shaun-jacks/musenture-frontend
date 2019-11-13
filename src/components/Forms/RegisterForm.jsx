import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { handleRegisterUser, resetRegisterForm } from "../../actions/auth";
import TextButton from "../Buttons/TextButton";
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

const StyledForm = styled.form``;

class RegisterForm extends Component {
  state = {
    inputs: {
      displayName: "",
      email: "",
      password: "",
      password2: ""
    },
    error: {}
  };

  componentDidMount() {
    this.props.resetRegisterForm();
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
        {this.props.auth.loading && <div>Registering User...</div>}
        {this.props.auth.registerSuccess && (
          <div
            style={{ color: "#4F8A10", background: "#DFF2BF", padding: "1em" }}
          >
            User registered! Go back to login page.
          </div>
        )}
        {!this.props.auth.registerSuccess && !this.props.loading && (
          <FormWrapper>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.props.handleRegisterUser(
                  this.state.inputs.email,
                  this.state.inputs.displayName,
                  this.state.inputs.password,
                  this.state.inputs.password2
                );
              }}
            >
              <div>
                <label>Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  placeholder="Enter Display Name..."
                  onChange={this.handleInputChange}
                  value={this.state.inputs.displayName}
                  required
                />
              </div>
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
              <div>
                <label>Re-enter Password</label>
                <input
                  type="password"
                  placeholder="Re-enter Password..."
                  onChange={this.handleInputChange}
                  value={this.state.inputs.password2}
                  name="password2"
                />
              </div>
              <button type="submit">
                <TextButton text={"Register"} />
              </button>
            </form>
          </FormWrapper>
        )}
        {this.props.auth.error && (
          <div
            style={{ color: "#D8000C", background: "#FFD2D2", padding: "1em" }}
          >
            Error registering user... {this.props.auth.error}
          </div>
        )}
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
  handleRegisterUser,
  resetRegisterForm,
  push
})(RegisterForm);
