"use client";

import styled from "styled-components";
import { FC, useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setGamesData, setChosenGames } from "@/app/store/slice";
import SliderElement from "./Slider/SliderElement";

interface sliderProps {
  data: any;
}

const SliderWrapper = styled.div`
  width: 1427px;
  height: 462px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  border: 1px solid green;
`;

const Slider: FC<sliderProps> = ({ data }) => {
  const [prevPosition, setPrevPosition] = useState("0px");
  const [nextPosition, setNextPosition] = useState("0px");
  const [animation, setAnimation] = useState("0");
  const [count, setCount] = useState(0);
  const sliderRef = useRef("");

  function sliderRight() {
    console.log("Длина", sliderRef.current.scrollWidth);
    console.log("Позиция" + nextPosition.replace("px", "").replace("-", ""));
    if (
      sliderRef.current.scrollWidth - 2000 <=
      +nextPosition.replace("px", "").replace("-", "")
    ) {
      console.log("харэ уже");
      return null;
    } else {
      setPrevPosition(nextPosition);
      const position = +nextPosition.replace("px", "");
      setNextPosition(position - 1457 + "px");
      setAnimation("1");
    }
  }

  

  return (
    <>
      <SliderWrapper>
        {data.title}

        <div
          ref={sliderRef}
          style={{
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          <SliderElement
            data={data.offers}
            animation={animation}
            setAnimation={setAnimation}
            sliderFrom={prevPosition}
            sliderTo={nextPosition}
          />
        </div>
        <button
          onClick={() => {
            sliderRight();
          }}
        >
          right
        </button>
        <button /* onClick={() => } */>left</button>
      </SliderWrapper>
    </>
  );
};

export default Slider;
