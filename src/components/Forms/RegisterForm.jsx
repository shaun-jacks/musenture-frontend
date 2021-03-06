import React, { Component } from "react";
import styled from "styled-components";
import TextButton from "../Buttons/TextButton";
import Error from "../Messages/Error";
import Success from "../Messages/Success";
import Spinner from "../Spinner";
import { ScaleLoader } from "react-spinners";

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
      border: 1px solid white;
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

  componentDidMount() {}

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
        {this.props.auth.isLoading && (
          <Spinner
            loading={this.props.auth.isLoading}
            text={"Registering User..."}
            center={false}
          />
        )}
        {this.props.auth.registerSuccess && (
          <Success>User registered! Go to login page.</Success>
        )}
        {!this.props.auth.registerSuccess && !this.props.auth.isLoading && (
          <FormWrapper>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.props.registerUser({
                  email: this.state.inputs.email,
                  displayName: this.state.inputs.displayName,
                  password: this.state.inputs.password,
                  password2: this.state.inputs.password2
                });
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
        {this.props.auth.error && <Error>Error registering user... </Error>}
      </div>
    );
  }
}

export default RegisterForm;
