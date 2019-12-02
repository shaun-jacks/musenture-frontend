import React, { useState } from "react";
import RegisterForm from "../../containers/Forms/RegisterForm";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const RegisterPageWrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

const RegisterWrapper = styled.div`
  padding: 1em;
`;

const AccentWrapper = styled.div``;
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

const Register = () => {
  return (
    <RegisterPageWrapper>
      <AccentWrapper>
        <AccentContainer>
          <Title>Musenture</Title>
          <p>
            <strong>Welcome</strong> fellow music lovers!
          </p>
          <h3>Ready for a music adventure?</h3>
        </AccentContainer>
      </AccentWrapper>
      <RegisterWrapper>
        <h1>Register</h1>
        <div>
          <RegisterForm />
        </div>
        <div style={{ margin: "1em 0em" }}>
          <small>
            {" "}
            Have an account?{" "}
            <NavLink
              style={{
                textDecoration: "none"
              }}
              to="/login"
            >
              Login here
            </NavLink>{" "}
          </small>
        </div>
      </RegisterWrapper>
    </RegisterPageWrapper>
  );
};

// Register
// Form
// Signup with Facebook
// Signup with Google

export default Register;
