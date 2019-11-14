import React, { Component } from "react";
import styled from "styled-components";
import NavbarMobile from "../components/Header/NavbarMobile";
import NavbarLarge from "../components/Header/NavbarLarge";
import "../index.css";

const ResponsiveLayout = styled.div`
  /* Small devices */
  background: var(--bg);
  @media only screen and (max-width: 599px) {
    .navbarMobile {
      width: 100vw;
      position: fixed;
      bottom: 0px;
      right: 50%;
      margin-right: -50vw;
      height: 6vh;
      overflow: auto;
      background-color: var(--bgAccent);
      z-index: 10;
    }

    .page {
      width: 100%;
      min-height: 100vh;
      display: grid;
      grid-template-rows: auto 20px 6vh;
      .main {
        grid-row-start: 1;
        .navbarLarge {
          display: none;
        }
      }
      .footer {
        grid-row-start: 2;
      }
    }
  }
  /* Larger Devices */
  @media only screen and (min-width: 600px) {
    .navbarMobile {
      display: none;
    }
    .page {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`;

class Layout extends Component {
  state = {};

  render() {
    return (
      <ResponsiveLayout>
        <div className="navbarMobile">
          <NavbarMobile />
        </div>
        <div className="page">
          <div className="main">
            <div className="navbarLarge">
              <NavbarLarge />
            </div>
            <div className="content">{this.props.children}</div>
          </div>
          <div className="footer"></div>
        </div>
      </ResponsiveLayout>
    );
  }
}

export default Layout;
