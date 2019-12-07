import React, { useEffect, Component } from "react";
import styled from "styled-components";
import JamList from "../Jams/JamList";
import { FadeLoader } from "react-spinners";

const JamPageWrapper = styled.div`
  padding: 1em;
`;

const Jams = ({ fetchJams, fetchUsers, jams, users, areJamsLoading }) => {
  useEffect(() => {
    console.log(users);
    if (users.allIds.length === 0) {
      fetchUsers();
    }
    fetchJams();
  }, []);

  return (
    <JamPageWrapper>
      {areJamsLoading && (
        <FadeLoader
          sizeUnit={"px"}
          size={150}
          color={"var(--orangeGradientEnd)"}
          loading={areJamsLoading}
        />
      )}
      {!areJamsLoading && <JamList jams={jams} />}
    </JamPageWrapper>
  );
};

export default Jams;
