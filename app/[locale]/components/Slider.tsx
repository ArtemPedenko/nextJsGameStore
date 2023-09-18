"use client";

import styled from "styled-components";
import { FC, useEffect, useState } from "react";
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
  const [count, setCount] = useState(0);
  function right() {
    console.log(count);
    if (count + 6 >= data.offers.length) {
      setCount(data.offers.length - 6);
    } else {
      setCount(count + 6);
    }
  }

  function left() {
    console.log(count);
    if (count - 6 <= 0) {
      setCount(0);
    } else {
      setCount(count - 6);
    }
  }

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
          {data.offers.slice(count, count + 6).map((item, index) => {
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
                    height: "280px",
                    width: "210px",
                    objectFit: "cover",
                  }}
                />
              </div>
            );
          })}
        </div>
        <button onClick={() => right()}>right</button>
        <button onClick={() => left()}>left</button>
      </SliderWrapper>
    </>
  );
};

export default Slider;
