import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import HomeButton from "../../components/Buttons/HomeButton";
import SearchButton from "../../components/Buttons/SearchButton";
import CalendarButton from "../../components/Buttons/CalendarButton";
import MeButton from "../../components/Buttons/MeButton";
import LoginButton from "../../components/Buttons/LoginButton";
import { IconContext } from "react-icons";
import { FiLogIn } from "react-icons/fi";
const NavList = styled.ul`
  width: 100%;
  height: 100%;
  margin: 0;
  li {
    flex: 1;
    list-style: none;
  }
  a.active {
    .btn {
      color: var(--bgAccent);
    }
    .btn-border {
      background: linear-gradient(to right, #0076d0, var(--secondaryColor));
    }
  }
  a {
    .btn {
      color: var(--secondaryColor);
    }
  }
  display: flex;
  overflow: auto;
`;

class Navbar extends Component {
  state = {};
  render() {
    const { isAuthenticated } = this.props;
    return (
      <NavList>
        {isAuthenticated ? (
          <li>
            <NavLink exact to="/me" activeClassName="active">
              <MeButton />
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink
              style={{
                textDecoration: "none",
                color: "black"
              }}
              exact
              to="/"
              activeClassName="active"
            >
              <LoginButton />
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            style={{
              textDecoration: "none",
              color: "black"
            }}
            exact
            to="/users"
            activeClassName="active"
          >
            <SearchButton />
          </NavLink>
        </li>
        <li>
          <NavLink
            style={{
              textDecoration: "none",
              color: "black"
            }}
            exact
            to="/jams"
            activeClassName="active"
          >
            <CalendarButton />
          </NavLink>
        </li>
      </NavList>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.id ? true : false
  };
}

export default connect(mapStateToProps)(Navbar);
