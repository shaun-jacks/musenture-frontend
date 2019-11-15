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
    // Only fetch new jams if first time, or new jam created
    if (this.props.jams.fetchNewJams) {
      if (this.props.auth.isAuthenticated) {
        const userId = this.props.auth.user.id;
        this.props.handleFetchJams(userId);
      } else {
        this.props.handleFetchJams();
      }
    }

    console.log(this.props);
  }
  render() {
    console.log(this.props.jams);
    const { jams } = this.props.jams;
    return (
      <JamPageWrapper>
        <JamList jams={jams} me={this.props.me} />
      </JamPageWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    jams: state.jams.jams,
    me: state.auth.user
  };
}

export default connect(mapStateToProps, { handleFetchJams })(Jams);
