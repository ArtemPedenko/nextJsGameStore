"use client";

import React from "react";
import SiteLogo from "@/images/SiteLogo";
import LanguageLogo from "@/images/LanguageLogo";
import ProfileLogo from "@/images/ProfileLogo";
import IconWrapper from "../components/IconWrapper";
import Divider from "../components/Divider";
import styled from "styled-components";
import LanguageModal from "./Headerr/LanguageModal";
import { useState, useRef } from "react";
import HeaderButton from "./Headerr/HeaderButton";
import { useI18n, useScopedI18n } from '../../../locales/client'


const HeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  gap: 10px;
`;

export default function Header() {
  const t = useI18n()

  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);
  const myRef = useRef(null);

  return (
    <>
      <HeaderWrapper>
        <HeaderLeft>
          <IconWrapper
            icon={<SiteLogo />}
            height="100%"
            width="50px"
            margin="0 10px"
          />
          <HeaderButton href="./">{t(`store`)}</HeaderButton>
          <HeaderButton href="./distribution">
            {t(`distribution`)}
          </HeaderButton>
          <HeaderButton href="./support">{t(`support`)}</HeaderButton>
          <Divider />
          <HeaderButton href="./">UNREAL ENGINE</HeaderButton>
        </HeaderLeft>
        <HeaderRight>
          <div
            style={{
              height: "100%",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
            onMouseEnter={() => modalOpen()}
            onMouseLeave={() => modalClose()}
            ref={myRef}
            id="modalParent"
          >
            <IconWrapper
              icon={<LanguageLogo />}
              height="30px"
              width="30px"
              margin="0"
            />
          </div>
          <IconWrapper
            icon={<ProfileLogo />}
            height="30px"
            width="30px"
            margin="0"
          />
          <HeaderButton href="./">{t(`sign_in`)}</HeaderButton>
        </HeaderRight>
      </HeaderWrapper>
      <LanguageModal
        isOpen={open}
        close={modalClose}
        open={modalOpen}
        parentRef={myRef}
      />
    </>
  );
}