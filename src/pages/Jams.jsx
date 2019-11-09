import React, { useEffect, Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import JamList from "../components/Jam/JamList";
import { handleFetchJams } from "../actions/jams";

const JamPageWrapper = styled.div`
  padding: 1em;
`;

class Jams extends Component {
  componentDidMount() {
    this.props.handleFetchJams();
    console.log(this.props);
  }
  render() {
    const { jams } = this.props.jams;
    return (
      <JamPageWrapper>
        <JamList jams={jams} />
      </JamPageWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    jams: state.jams.jams
  };
}

export default connect(
  mapStateToProps,
  { handleFetchJams }
)(Jams);
