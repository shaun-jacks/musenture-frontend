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

const NavList = styled.ul`
  text-decoration: none;
  list-style-type: none;
  margin: 0em auto 0em auto;
  display: flex;
  justify-content: space-evenly;
  padding: 0em 0em;
  height: 100%;
  li {
    margin 0em 0em;
    height: 100%;
    &:hover {
      cursor: pointer;
    }
  }
  .active {
    color: var(--bgButtonActive);
  }
`;

class Navbar extends Component {
  state = {};
  render() {
    const { isAuthenticated } = this.props;
    return (
      <NavList>
        {isAuthenticated ? (
          <li>
            <NavLink
              style={{
                textDecoration: "none",
                color: "black"
              }}
              exact
              to="/me"
              activeClassName="active"
            >
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
