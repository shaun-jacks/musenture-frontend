import React from "react";
import LoginForm from "../components/Forms/LoginForm";
import SocialLoginForm from "../components/Forms/SocialLoginForm";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const LoginWrapper = styled.div`
  padding: 1em;
`;

const AccentContainer = styled.div`
  background: var(--bgAccent);
  margin: 0 auto 1em auto;
  padding: 1em;
`;

const Title = styled.h1`
  /* Larger Devices title is already in navbar */
  @media only screen and (min-width: 600px) {
    display: none;
  }
`;

const Login = () => {
  return (
    <div>
      <AccentContainer>
        <Title>Musenture</Title>
        <p>
          <strong>Welcome</strong> fellow music lovers!
        </p>
        <h3>Ready for a music adventure?</h3>
      </AccentContainer>
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
            </NavLink>
            {"."}
          </small>
        </div>
        <SocialLoginForm />
      </LoginWrapper>
    </div>
  );
};

export default Login;
