import React from "react";
import Jam from "../../containers/Jams/Jam";
import styled from "styled-components";

const JamListWrapper = styled.div`
  /* Larger Devices */
  @media only screen and (min-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

const JamList = props => {
  console.log(props.jams);

  return (
    <JamListWrapper>
      {props.jams && props.jams.map(jam => <Jam jam={jam} />)}
    </JamListWrapper>
  );
};

export default JamList;
