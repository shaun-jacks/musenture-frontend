import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import styled from "styled-components";

const IconWrapper = styled.div``;

const Heart = () => {
  return (
    <IconWrapper>
      <IconContext.Provider value={{ size: "1em", className: "instrument" }}>
        <FaRegHeart color="var(--bg)" />
      </IconContext.Provider>
    </IconWrapper>
  );
};

export default Heart;
