import React, { Component } from "react";
import styled from "styled-components";
import TextButton from "../Buttons/TextButton";
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
      <CreateJamWrapper>
        <h1>Create a Jam!</h1>
        {this.props.jams.loading && <div>Creating Jam...</div>}
        {this.props.jams.error && (
          <Error>Error creatinng jam... {this.props.jams.error}</Error>
        )}
        <FormWrapper>
          <form
            onSubmit={async e => {
              e.preventDefault();
              const {
                title,
                description,
                location,
                dateOfJam
              } = this.state.inputs;
              this.props.createJam({ title, description, location, dateOfJam });
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

export default CreateJamForm;
