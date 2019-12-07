import React, { useEffect, Component } from "react";
import styled from "styled-components";
import JamList from "../Jams/JamList";
import Spinner from "../Spinner";
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
        <Spinner
          loading={areJamsLoading}
          text={"Loading Jams..."}
          center={true}
        />
      )}
      {!areJamsLoading && <JamList jams={jams} />}
    </JamPageWrapper>
  );
};

export default Jams;
