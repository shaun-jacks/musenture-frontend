import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFetchMe, handleFetchMeJams } from "../actions/me";
import JamList from "../components/Jam/JamList";
import styled from "styled-components";
import Instrument from "../components/Icons/Instruments";

const MePageWrapper = styled.div`
  background-color: var(--bg);
`;

const ProfileInfoDisplay = styled.div`
  background-color: var(--bgAccent);
  padding: 1em;
  display: flex;
  justify-content: space-between;
  padding: 1em;
  img {
    border-radius: 50%;
  }
  .profile-left {
    h2 {
      margin: 0.25em;
    }
  }
`;

const JamsWrapper = styled.div`
  background-color: var(--bg);
  height: 100%;
  padding: 1em;
`;

class Me extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (!this.props.me.user) {
        // Fetch user data
        this.props.handleFetchMe();
      }
      this.props.handleFetchMeJams(this.props.auth.user.id);
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { user } = this.props.auth;
    let me, jams;
    if (this.props.me) {
      console.log(this.props.me);
      me = this.props.me.user;
      if (this.props.me.jams) {
        jams = this.props.me.jams.jams;
      }
    }
    return (
      <div>
        {isAuthenticated ? (
          <MePageWrapper>
            <ProfileInfoDisplay>
              <div className="profile-left">
                <img src={me.avatar} height="100px" width="100px" />
                <h2>{me.displayName}</h2>
              </div>
              <div className="profile-right">
                <Instrument instrument={me.instrument} />
                <p>{me.bio}</p>
              </div>
              <div style={{ flex: ".25" }} />
            </ProfileInfoDisplay>
            <JamsWrapper>
              <JamList jams={jams} me={user} />
            </JamsWrapper>
          </MePageWrapper>
        ) : (
          <div>Login to view profile</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    me: state.me.me
  };
}

export default connect(
  mapStateToProps,
  { handleFetchMe, handleFetchMeJams }
)(Me);
