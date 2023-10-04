"use client";

import styled from "styled-components";

const FooterWrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: #2a2a2a;
  display: flex;
  align-items: center;
`;

export default function Footer() {
  return <FooterWrapper>© Все права защищены</FooterWrapper>;
}
