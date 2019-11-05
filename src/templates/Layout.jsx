import React, { Component } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";

const CenterContent = styled.div`
  margin-top: 2.5em;
  margin-left: auto;
  margin-right: auto;
`;

class Layout extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh"
        }}
      >
        <div>
          <div>
            <Header />
          </div>
          <CenterContent>{this.props.children}</CenterContent>
        </div>
        <div>Footer</div>
      </div>
    );
  }
}

export default Layout;
