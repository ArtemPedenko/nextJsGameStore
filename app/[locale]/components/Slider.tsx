"use client";

import styled from "styled-components";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setGamesData, setChosenGames } from "@/app/store/slice";

interface sliderProps {
  data: any;
}

const SliderWrapper = styled.div`
  width: 1427px;
  height: 462px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  border: 1px solid red;
`;

const Slider: FC<sliderProps> = ({ data }) => {
  console.log(data);
  return (
    <>
      <SliderWrapper>
        {data.title}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
            justifyContent: "space-between",
          }}
        >
          {data.offers.slice(0, 5).map((item, index) => {
            let imgUrl = "";
            item.offer.keyImages.map((item) => {
              if (item.type === "Thumbnail") {
                imgUrl = item.url;
              }
            });
            return (
              <div key={index}>
                <img
                  alt=""
                  src={imgUrl}
                  style={{
                    height: "210px",
                    width: "157px",
                    objectFit: "cover",
                  }}
                />
              </div>
            );
          })}
        </div>
      </SliderWrapper>
    </>
  );
};

export default Slider;
