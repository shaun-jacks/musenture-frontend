import React, { Component } from "react";
import styled from "styled-components";
import TextButton from "../Buttons/TextButton";
import Error from "../Messages/Error";
import Success from "../Messages/Success";

const EditProfileWrapper = styled.div`
  padding: 1em;
  background: var(--bg);
`;

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
      color: white;
      border: 1px solid var(--bg);
    }
    button {
      border: none;
      background-color: var(--bg);
    }
  }
`;

class EditProfileForm extends Component {
  state = {
    inputs: {
      displayName: "",
      bio: "",
      instrument: ""
    }
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
      <EditProfileWrapper>
        <h1>Edit Profile</h1>
        {/* {this.props.me.loading && <div>Editing Profile...</div>}
        {this.props.me.editProfileSuccess && <Success>Profile Edited!</Success>}
        {this.props.me.error && (
          <Error>Error editing profile... {this.props.auth.error}</Error>
        )} */}
        <FormWrapper>
          <form
            onSubmit={async e => {
              e.preventDefault();
              console.log(this.props);
              const { displayName, bio, instrument } = this.state.inputs;
              this.props.editUser({ displayName, bio, instrument });
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
              <label>Bio</label>
              <input
                type="text"
                placeholder="Enter bio..."
                onChange={this.handleInputChange}
                value={this.state.inputs.bio}
                name="bio"
              />
            </div>
            <div>
              <label>Instrument</label>
              <input
                type="text"
                placeholder="Enter instrument..."
                onChange={this.handleInputChange}
                value={this.state.inputs.instrument}
                name="instrument"
              />
            </div>
            <button type="submit">
              <TextButton text={"Submit"} />
            </button>
          </form>
        </FormWrapper>
      </EditProfileWrapper>
    );
  }
}

export default EditProfileForm;
