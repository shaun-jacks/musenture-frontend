import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { FiLogIn } from "react-icons/fi";
import { IconContext } from "react-icons";

const NavList = styled.ul`
  text-decoration: none;
  list-style-type: none;
  margin: 1em auto 0em auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0em 0em;
  li {
    margin: 0em 2em;
  }
  .active {
    pointer: cursor;
    color: gray;
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
            {
              <IconContext.Provider
                value={{ size: "1.5em", className: "global-class-name" }}
              >
                <div>
                  <FaHome />
                </div>
              </IconContext.Provider>
            }
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
            <IconContext.Provider
              value={{ size: "1.5em", className: "global-class-name" }}
            >
              <div>
                <FaSearch />
              </div>
            </IconContext.Provider>
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
            <IconContext.Provider
              value={{ size: "1.5em", className: "global-class-name" }}
            >
              <div>
                <FaCalendarAlt />
              </div>
            </IconContext.Provider>
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
              <IconContext.Provider
                value={{ size: "1.5em", className: "global-class-name" }}
              >
                <div>
                  <GoPerson />
                </div>
              </IconContext.Provider>
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