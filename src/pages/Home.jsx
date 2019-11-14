import React from "react";
import styled from "styled-components";

const HomePageWrapper = styled.div`
  margin-top: 0em;
`;

const AccentContainer = styled.div`
  background: var(--bgAccent);
  margin: 0 auto 1em auto;
  padding: 1em;
`;

const Home = () => {
  return (
    <HomePageWrapper>
      <AccentContainer>
        <h1>Musenture</h1>
        <p>
          <strong>Welcome</strong> fellow music lovers!
        </p>
        <h3>Ready for a music adventure?</h3>
      </AccentContainer>

      <AccentContainer>
        <p>
          With musenture, we make it easy for you to create virtual jam
          sessions.
        </p>
        <p>
          Just sign up for an account, and create a jam wherever you want,
          whenever you want.
        </p>
      </AccentContainer>
      <AccentContainer></AccentContainer>
    </HomePageWrapper>
  );
};

export default Home;
