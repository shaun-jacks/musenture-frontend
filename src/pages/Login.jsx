import React from "react";
import LoginForm from "../components/Forms/LoginForm";
import SocialLoginForm from "../components/Forms/SocialLoginForm";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const LoginWrapper = styled.div`
  padding: 1em;
`;

const Login = () => {
  return (
    <LoginWrapper>
      <h2>Login</h2>
      <LoginForm />
      <div style={{ margin: "1em 0em" }}>
        <small>
          {" "}
          Don't have an account?{" "}
          <NavLink
            style={{
              textDecoration: "none"
            }}
            to="/register"
          >
            Register here
          </NavLink>{" "}
          or...
        </small>
      </div>
      <SocialLoginForm />
    </LoginWrapper>
  );
};

export default Login;
