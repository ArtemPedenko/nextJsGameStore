"use client";

import styled from "styled-components";
import { useI18n } from "@/locales/client";

const FooterWrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0 0 0;
  z-index: 10;
  position: relative;
`;

export default function Footer() {
  const t = useI18n();

  return <FooterWrapper>{t(`rights`)}</FooterWrapper>;
}
