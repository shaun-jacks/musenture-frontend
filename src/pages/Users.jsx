import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import UserList from "../components/Users/UserList";
import { handleFetchUsers } from "../actions/users";

const UsersPageWrapper = styled.div`
  padding: 1em;
`;

class Users extends Component {
  componentDidMount() {
    this.props.handleFetchUsers();
  }
  render() {
    let { users } = this.props.users;
    // Filter out me
    if (this.props.auth.isAuthenticated) {
      users = users.filter(user => user._id !== this.props.auth.user.id);
    }
    return (
      <UsersPageWrapper>
        <UserList users={users} me={this.props.me} />
      </UsersPageWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    fetchNewUsers: state.users.users.fetchNewUsers,
    users: state.users.users,
    me: state.auth.user
  };
}

export default connect(mapStateToProps, { handleFetchUsers })(Users);
