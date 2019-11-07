import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFetchMe, handleFetchMeJams } from "../actions/me";

class Me extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (!this.props.me.user) {
        // Fetch user data
        this.props.handleFetchMe();
      }
      if (!this.props.me.jams) {
        // Fetch user jams data
        console.log(this.props.me);
        this.props.handleFetchMeJams(this.props.auth.user.id);
      }
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    let me, jams;
    if (this.props.me) {
      console.log(this.props.me);
      me = this.props.me.user;
      jams = this.props.me.jams.jams;
    }
    return (
      <div>
        {isAuthenticated ? (
          <div>
            <div>
              <img src={me.avatar} />
              <h1>{me.name}</h1>
              <h2>{me.instrument}</h2>
              <h3>{me.skill}</h3>
              <p>{me.bio}</p>
            </div>
            <div>
              <h2>{jams.title}</h2>
              <p>{jams.description}</p>
              <small>{jams.createdAt}</small>
              <ul>
                {jams.genres.map(genre => {
                  return <li>{genre}</li>;
                })}
              </ul>
            </div>
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
  { handleFetchMe, handleFetchMeJams }
)(Me);
