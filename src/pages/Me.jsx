import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFetchMe } from "../actions/me";

class Me extends Component {
  componentDidMount() {}

  render() {
    console.log(this.props.me);
    const { isAuthenticated } = this.props.auth;
    let me, name, skill, instruments, bio, avatar;
    if (this.props.me) {
      me = this.props.me.user;
      name = me.displayName;
      skill = me.skill;
      avatar = me.avatar;
      instruments = me.instrument;
      bio = me.bio;

      console.log(me);
    }
    return (
      <div>
        {isAuthenticated ? (
          <div>
            <img src={avatar} />
            <h1>{name}</h1>
            <h2>{instruments}</h2>
            <h3>{skill}</h3>
            <p>{bio}</p>
          </div>
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
  { handleFetchMe }
)(Me);
