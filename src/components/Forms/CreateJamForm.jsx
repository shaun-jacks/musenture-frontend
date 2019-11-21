import React, { Component } from "react";
import styled from "styled-components";
import { handleCreateJam, resetCreateJamForm } from "../../actions/jams";
import TextButton from "../Buttons/TextButton";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import Error from "../Messages/Error";
import Success from "../Messages/Success";

const CreateJamWrapper = styled.div`
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

class CreateJamForm extends Component {
  state = {
    inputs: {
      title: "",
      description: "",
      dateOfJam: "",
      genres: [],
      location: ""
    }
  };
  componentDidMount() {
    this.props.resetCreateJamForm();
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
      <CreateJamWrapper>
        <h1>Create a Jam!</h1>
        {this.props.jams.loading && <div>Creating Jam...</div>}
        {this.props.jams.createJamSuccess && <Success>Jam Created!</Success>}
        {this.props.jams.error && (
          <Error>Error creatinng jam... {this.props.auth.error}</Error>
        )}
        <FormWrapper>
          <form
            onSubmit={async e => {
              e.preventDefault();
              console.log(this.props.auth.isAuthenticated);
              if (this.props.auth.isAuthenticated) {
                console.log(this.props);
                console.log(this.props.me.user);
                await this.props.handleCreateJam(
                  this.state.inputs.title,
                  this.state.inputs.description,
                  this.state.inputs.location,
                  this.state.inputs.dateOfJam,
                  [],
                  this.props.me.user.avatar
                );
              }
            }}
          >
            <div>
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter jam title..."
                onChange={this.handleInputChange}
                value={this.state.inputs.title}
                required
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="description"
                placeholder="Enter jam description..."
                onChange={this.handleInputChange}
                value={this.state.inputs.description}
                name="description"
              />
            </div>
            <div>
              <label>Location</label>
              <input
                type="location"
                placeholder="Enter jam location..."
                onChange={this.handleInputChange}
                value={this.state.inputs.location}
                name="location"
              />
            </div>
            <div>
              <label for="dateOfJam">Date of Jam</label>
              <input
                type="date"
                id="dateOfJam"
                name="dateOfJam"
                onChange={this.handleInputChange}
                value={this.state.inputs.dateOfJam}
              />
            </div>
            <button type="submit">
              <TextButton text={"Create Jam!"} />
            </button>
          </form>
        </FormWrapper>
      </CreateJamWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    me: state.me.me,
    auth: state.auth,
    jams: state.jams.jams
  };
}

export default connect(mapStateToProps, {
  handleCreateJam,
  resetCreateJamForm,
  push
})(CreateJamForm);
