"use client";

import styled from "styled-components";
import SearchField from "./HeaderSticky/SearchField";
import HeaderStickyButton from "./HeaderSticky/HeaderStickyButton";
import { useI18n } from "@/locales/client";
import ArrowDown from "@/images/ArrowDown";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100px;
  background-color: #121212;
  position: sticky;
  top: 0;
  z-index: 9;
`;

const StickyHead = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  max-width: 1427px;
  width: 90%;
  background-color: #121212;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  gap: 0 20px;
`;

const SickyHeaderExpanded = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const StickyHeaderMinimized = styled.div`
  height: 100%;
  display: none;
  position: relative;
  @media (max-width: 768px) {
    display: block;
    display: flex;
    align-items: center;
  }
`;

const StickyHeaderMinimizedOpen = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 200%;
  padding: 30px 0;
  top: 100%;
  left: -50%;
  background-color: #121212;
  z-index: 12;
`;

export default function HeaderSticky() {
  const t = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  function discoverOpen() {
    setMenuOpen(!menuOpen);
  }
  return (
    <Wrapper>
      <StickyHead>
        <SearchField />
        <SickyHeaderExpanded>
          <HeaderStickyButton href="/">{t(`discover`)}</HeaderStickyButton>
          <HeaderStickyButton href="/allGames">
            {t(`browse`)}
          </HeaderStickyButton>
          <HeaderStickyButton href="/indeveloping">
            {t(`news`)}
          </HeaderStickyButton>
        </SickyHeaderExpanded>
        <StickyHeaderMinimized>
          <HeaderStickyButton onClick={discoverOpen}>
            {t(`discover`)}
            <ArrowDown />
          </HeaderStickyButton>
          {menuOpen ? (
            <StickyHeaderMinimizedOpen>
              <HeaderStickyButton href="/">{t(`discover`)}</HeaderStickyButton>
              <HeaderStickyButton href="/allGames">
                {t(`browse`)}
              </HeaderStickyButton>
              <HeaderStickyButton href="/indeveloping">
                {t(`news`)}
              </HeaderStickyButton>
            </StickyHeaderMinimizedOpen>
          ) : null}
        </StickyHeaderMinimized>
      </StickyHead>
    </Wrapper>
  );
}
