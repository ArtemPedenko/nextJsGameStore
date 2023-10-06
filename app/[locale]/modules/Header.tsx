"use client";

import React from "react";
import SiteLogo from "@/images/SiteLogo";
import LanguageLogo from "@/images/LanguageLogo";
import ProfileLogo from "@/images/ProfileLogo";
import CloseLogo from "@/images/CloseLogo";
import MobileMenuLogo from "@/images/MobileMenuLogo";
import IconWrapper from "../components/IconWrapper";
import Divider from "../components/Divider";
import styled from "styled-components";
import LanguageModal from "./Header/LanguageModal";
import { useState, useRef } from "react";
import HeaderButton from "./Header/HeaderButton";
import { useI18n, useCurrentLocale } from "../../../locales/client";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: #2a2a2a;
  display: flex;
  align-items: center;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  gap: 10px;
  margin: 0 0 0 auto;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: 50px;
    height: 50px;
    background-color: #0078f2;
    margin: 0 0 0 auto;
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  right: 0px;
  width: 80vw;
  background-color: #2a2a2a;
  height: 90vh;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const MobileMenuTop = styled.div`
  display: flex;
  flex-direction: column;
  height: 180px;
  margin: 0 0 10px 0;
`;

const MobileMenuBottom = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  border: 1px solid red;
  align-items: center;
`;
const MobileMenuBottomLeft = styled.div`
  width: 30%;
  border: 1px solid red;
  display: flex;
  justify-content: center;
`;

const MobileMenuBottomRight = styled.div`
  width: 30%;
  border: 1px solid red;
  display: flex;
  justify-content: center;
`;

export default function Header() {
  const t = useI18n();

  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuSwitcher = () => setMobileMenuOpen(!mobileMenuOpen);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);
  const myRef = useRef(null);

  return (
    <>
      <HeaderWrapper>
        <>
          <IconWrapper
            icon={<SiteLogo />}
            height="100%"
            width="50px"
            margin="0 10px"
          />
          <HeaderLeft>
            <HeaderButton href="/">{t(`store`)}</HeaderButton>
            <HeaderButton href="/">{t(`distribution`)}</HeaderButton>
            <HeaderButton href="/">{t(`support`)}</HeaderButton>
            <Divider />
            <HeaderButton href="https://www.unrealengine.com/en-US">
              UNREAL ENGINE
            </HeaderButton>
          </HeaderLeft>
        </>
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
        <MobileMenuButton onClick={() => menuSwitcher()}>
          <IconWrapper
            icon={mobileMenuOpen ? <CloseLogo /> : <MobileMenuLogo />}
            height="100%"
            width="50px"
          />
        </MobileMenuButton>
      </HeaderWrapper>
      {mobileMenuOpen ? (
        <MobileMenu>
          <MobileMenuTop>
            <HeaderButton href="/">{t(`store`)}</HeaderButton>
            <HeaderButton href="/">{t(`distribution`)}</HeaderButton>
            <HeaderButton href="/">{t(`support`)}</HeaderButton>
            <HeaderButton href="https://www.unrealengine.com/en-US">
              UNREAL ENGINE
            </HeaderButton>
          </MobileMenuTop>
          <MobileMenuBottom>
            <MobileMenuBottomLeft>
              <IconWrapper
                icon={<LanguageLogo />}
                height="30px"
                width="30px"
                margin="0"
              />
            </MobileMenuBottomLeft>
            <Divider />
            <IconWrapper
              icon={<ProfileLogo />}
              height="30px"
              width="30px"
              margin="0"
            />
            <HeaderButton href="./">{t(`sign_in`)}</HeaderButton>
          </MobileMenuBottom>
        </MobileMenu>
      ) : null}
      <LanguageModal
        isOpen={open}
        close={modalClose}
        open={modalOpen}
        parentRef={myRef}
      />
    </>
  );
}
