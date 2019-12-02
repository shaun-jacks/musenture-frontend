import React from "react";
import LoginForm from "../Forms/LoginForm";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const LoginPageWrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

const LoginWrapper = styled.div`
  padding: 1em;
`;

const AccentContainer = styled.div`
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
    <LoginPageWrapper>
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
              to="/"
            >
              Register here
            </NavLink>
            {"."}
          </small>
        </div>
      </LoginWrapper>
    </LoginPageWrapper>
  );
};

export default Login;
