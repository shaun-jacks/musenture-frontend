import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFetchMe, handleFetchMeJams } from "../actions/me";
import JamList from "../components/Jam/JamList";
import styled from "styled-components";

const MePageWrapper = styled.div`
  background-color: var(--bg);
`;

const ProfileInfoDisplay = styled.div`
  background-color: var(--bgAccent);
  padding: 1em;
  img {
    border-radius: 50%;
  }
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
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
              <img src={me.avatar} height="100px" width="100px" />
              <h1>{me.name}</h1>
              <h2>{me.instrument}</h2>
              <h3>{me.skill}</h3>
              <p>{me.bio}</p>
            </ProfileInfoDisplay>
            <JamsWrapper>
              <JamList jams={jams} />
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
