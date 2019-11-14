import React, { useState } from "react";
import RegisterForm from "../components/Forms/RegisterForm";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const RegisterWrapper = styled.div`
  padding: 1em;
`;

const Register = () => {
  return (
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
            to="/"
          >
            Login here
          </NavLink>{" "}
        </small>
      </div>
    </RegisterWrapper>
  );
};

// Register
// Form
// Signup with Facebook
// Signup with Google

export default Register;
