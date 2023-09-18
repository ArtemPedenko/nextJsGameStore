"use client";

import styled from "styled-components";

const VericalDivider = styled.span`
  display: inline-block;
  width: 0px;
  height: 60%;
  border-right: 1px solid #b8b8b8;
  margin: 0 20px;
`;

const Divider = () => {
  return <VericalDivider />;
};

export default Divider;
