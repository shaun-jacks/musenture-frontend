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

const Login = () => {
  return (
    <div>
      <AccentContainer>
        <h1>Musenture</h1>
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
