"use client";

import { FC, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import SearchField from "./HeaderSticky/SearchField";
import HeaderStickyButton from "./HeaderSticky/HeaderStickyButton";
import { useI18n, useScopedI18n } from "../../../locales/client";

interface gameInfoProps {
  data: any;
  offerData: any;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 320px;
  border-radius: 6px;
  color: black;
`;

const StickyGameInfo: FC<gameInfoProps> = ({ data, offerData }) => {
  console.log(data);
  console.log(offerData);
  //
  return (
    <Wrapper>
      <img
        alt=""
        src={data.hero.logoImage.src}
        style={{ width: "280px", padding: "20px" }}
      />
      <div>
        {
          offerData.data.Catalog.catalogOffer.price.totalPrice.fmtPrice
            .originalPrice
        }
      </div>
    </Wrapper>
  );
};

export default StickyGameInfo;
