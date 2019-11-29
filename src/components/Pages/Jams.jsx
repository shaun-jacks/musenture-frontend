import React, { useEffect, Component } from "react";
import styled from "styled-components";
import JamList from "../Jams/JamList";

const JamPageWrapper = styled.div`
  padding: 1em;
`;

const Jams = ({ fetchJams, fetchUsers, jams, users }) => {
  useEffect(() => {
    console.log(users);
    if (users.allIds.length === 0) {
      fetchUsers();
    }
    fetchJams();
  }, []);

  return (
    <JamPageWrapper>
      <JamList jams={jams} />
    </JamPageWrapper>
  );
};

export default Jams;
