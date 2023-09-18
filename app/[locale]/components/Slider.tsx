"use client";

import styled from "styled-components";
import { FC, useEffect, useState } from "react";
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
  const [prevSlide, setPrevSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(6);
  const [animation, setAnimation] = useState("0");
  const [count, setCount] = useState(0);



  console.log("currentSlide", currentSlide)

  console.log("prevSlide", prevSlide)

  function previousSlideControll() {
    currentSlide - 6 <= 6 ? setPrevSlide(0) : setPrevSlide(currentSlide - 6);
  }

  function right() {
    if (currentSlide === data.offers.length - 6) {
      return;
    }
    if (currentSlide + 6 > data.offers.length) {
      setCurrentSlide(data.offers.length - 6);
      previousSlideControll();
    } else {
      setCurrentSlide(currentSlide + 6);
      previousSlideControll();
    }
  }

  function left() {
    if (currentSlide - 6 <= 0) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide - 6);
    }
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
            data={data.offers.slice(currentSlide, currentSlide + 6)}
            animation={animation}
            setAnimation={setAnimation}
            right={right}
          />
        </div>
        <button onClick={() => {
          currentSlide === data.offers.length - 6 ? null : setAnimation("1")
        }}>right</button>
        <button onClick={() => left()}>left</button>
      </SliderWrapper>
    </>
  );
};

export default Slider;
