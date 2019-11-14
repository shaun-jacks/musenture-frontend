import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1em;
  background: var(--bgAccent);
`;

const NavList = styled.ul`
  text-decoration: none;
  list-style-type: none;
  margin: 0 auto;
  display: flex;
  li {
    margin: 0em 1em;
    1emletter-spacing: "2px";
  }
  .active {
    pointer: cursor;
    color: gray;
  }
`;

class NavbarLarge extends Component {
  render() {
    const { isAuthenticated } = this.props;
    console.log(isAuthenticated);
    return (
      <NavWrapper>
        <div>
          <h1>Musenture</h1>
        </div>
        <div style={{ flex: "1" }} />
        <div>
          <NavList>
            <li>
              <NavLink
                style={{
                  textDecoration: "none",
                  color: "var(--bgButtons)",
                  letterSpacing: "2px"
                }}
                activeClassName="active"
                exact
                to="/users"
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                style={{
                  textDecoration: "none",
                  color: "var(--bgButtons)",
                  letterSpacing: "2px"
                }}
                activeClassName="active"
                exact
                to="/jams"
              >
                Jams
              </NavLink>
            </li>
            {isAuthenticated ? (
              <li>
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "var(--bgButtons)",
                    letterSpacing: "2px"
                  }}
                  activeClassName="active"
                  exact
                  to="me"
                >
                  Me
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "var(--bgButtons)",
                    letterSpacing: "2px"
                  }}
                  activeClassName="active"
                  exact
                  to="/"
                >
                  Login
                </NavLink>
              </li>
            )}
          </NavList>
        </div>
      </NavWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(NavbarLarge);
