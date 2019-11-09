import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import HomeButton from "../Buttons/HomeButton";
import SearchButton from "../Buttons/SearchButton";
import CalendarButton from "../Buttons/CalendarButton";
import MeButton from "../Buttons/MeButton";
import { FiLogIn } from "react-icons/fi";
import { IconContext } from "react-icons";

const NavList = styled.ul`
  text-decoration: none;
  list-style-type: none;
  margin: 0em auto 0em auto;
  display: flex;
  justify-content: space-evenly;
  padding: 0em 0em;
  height: 100%
  li {
    margin 0em 0em;
    height: 100%;
    &:hover {
      cursor: pointer;
    }
  }
`;

class Navbar extends Component {
  state = {};
  render() {
    const { isAuthenticated } = this.props;
    return (
      <NavList>
        <li>
          <NavLink
            style={{
              textDecoration: "none",
              color: "black"
            }}
            exact
            to="/"
          >
            <HomeButton />
          </NavLink>
        </li>
        <li>
          <NavLink
            style={{
              textDecoration: "none",
              color: "black"
            }}
            exact
            to="/jammers"
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
          >
            <CalendarButton />
          </NavLink>
        </li>
        {isAuthenticated ? (
          <li>
            <NavLink
              style={{
                textDecoration: "none",
                color: "black"
              }}
              exact
              to="/me"
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
              to="/login"
            >
              <IconContext.Provider
                value={{ size: "1.5em", className: "global-class-name" }}
              >
                <div>
                  <FiLogIn />
                </div>
              </IconContext.Provider>
            </NavLink>
          </li>
        )}
      </NavList>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(Navbar);
