import React, { useEffect, Component } from "react";
import { connect } from "react-redux";
import JamList from "../components/Jam/JamList";
import { handleFetchJams } from "../actions/jams";

class Jams extends Component {
  componentDidMount() {
    this.props.handleFetchJams();
    console.log(this.props);
  }
  render() {
    const { jams } = this.props.jams;
    return (
      <div>
        <JamList jams={jams} />
      </div>
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
