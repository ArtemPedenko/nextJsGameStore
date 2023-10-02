"use client";

import { FC, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import SearchField from "./HeaderSticky/SearchField";
import HeaderStickyButton from "./HeaderSticky/HeaderStickyButton";
import { useI18n, useScopedI18n } from "../../../locales/client";
import Button from "../components/Button";

interface gameInfoProps {
  data: any;
  offerData: any;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #121212;
  width: 320px;
  border-radius: 6px;
  color: white;
  gap: 15px;
  border: 1px solid red;
`;

const StickyGameInfo: FC<gameInfoProps> = ({ data, offerData }) => {
  //console.log(data);
  //console.log(offerData);
  //
  const t = useI18n();

  return (
    <Wrapper>
      <div>{offerData.title}</div>
      <div>{offerData.offerType === "BASE_GAME" ? t("base_game") : <></>}</div>
      <div>{offerData.price}</div>
      <Button>{t("buy")}</Button>
      <Button>{t("add_to_cart")}</Button>
      <Button>{t("add_to_wishlist")}</Button>
    </Wrapper>
  );
};

export default StickyGameInfo;
//Product.sandbox.configuration[0].configs.keyImages[0].url
