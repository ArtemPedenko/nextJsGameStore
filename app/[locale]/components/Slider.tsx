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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevPosition, setPrevPosition] = useState("0px");
  const [nextPosition, setNextPosition] = useState("0px");
  const [animation, setAnimation] = useState("0");
  const [count, setCount] = useState(0);

  /*   function previousSlideControll() {
    currentSlide - 6 <= 6 ? setPrevPosition(0) : setPrevPosition(currentSlide - 6);
  } */

  function right() {
    /*     if (currentSlide === data.offers.length - 6) {
      return;
    }
    if (currentSlide + 6 > data.offers.length) {
      setCurrentSlide(data.offers.length - 6);
      previousSlideControll();
    } else {
      setCurrentSlide(currentSlide + 6);
      previousSlideControll();
    } */
  }

  function left() {
    if (currentSlide - 6 <= 0) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide - 6);
    }
  }
  let from = "0px";
  let to = "";

  function sliderRight() {
    setPrevPosition(nextPosition);
    const position = +nextPosition.replace("px", "");
    setNextPosition(position - 1457 + "px");
  }

  //console.log(data.offers);
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
            setAnimation("1");
          }}
          //onClick={() => {
          //  currentSlide === data.offers.length - 6 ? null : setAnimation("1");
          //}}
        >
          right
        </button>
        <button onClick={() => left()}>left</button>
      </SliderWrapper>
    </>
  );
};

export default Slider;
