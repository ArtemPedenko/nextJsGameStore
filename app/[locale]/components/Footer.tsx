"use client";

import styled from "styled-components";
import { useI18n } from "@/locales/client";

const FooterWrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: end;
  margin-top: auto;
`;

const FooterInner = styled.div`
width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2a2a2a;
`

export default function Footer() {
  const t = useI18n();

  return <FooterWrapper><FooterInner>{t(`rights`)}</FooterInner></FooterWrapper>;
}
