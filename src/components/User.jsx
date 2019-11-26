import React, { useEffect } from "react";
import styled from "styled-components";
import ProfileInfoDisplay from "./Users/ProfileInfoDisplay";
import JamsList from "./Jam/JamList";

const UserPageWrapper = styled.div`
  background-color: var(--bg);
`;

const JamsWrapper = styled.div`
  background-color: var(--bg);
  height: 100%;
  padding: 1em;
`;

const User = ({
  user,
  followers,
  following,
  auth,
  fetchJamsByUserId,
  jamsGoing
}) => {
  console.log(jamsGoing);
  useEffect(() => fetchJamsByUserId(user.id), []);

  return (
    <UserPageWrapper>
      <ProfileInfoDisplay
        user={user}
        followers={followers}
        following={following}
      />
      {jamsGoing && <JamsList jams={jamsGoing} />}
    </UserPageWrapper>
  );
};

export default User;
