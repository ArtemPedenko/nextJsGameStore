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
  const [prevSlide, setPrevSlide] = useState(data.offers.length - 6);
  const [nextSlide, setNextSlide] = useState(6);
  const [animation, setAnimation] = useState("0");
  const [count, setCount] = useState(0);
  function right() {
    setAnimation("1");
    if (count + 6 >= data.offers.length) {
      setCurrentSlide(data.offers.length - 6);
    } else {
      setCurrentSlide(currentSlide + 6);
    }
  }

  function left() {
    if (count - 6 <= 0) {
      setCount(0);
    } else {
      setCount(count - 6);
    }
  }

  //console.log(data);
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
          />
        </div>
        <button onClick={() => right()}>right</button>
        <button onClick={() => left()}>left</button>
      </SliderWrapper>
    </>
  );
};

export default Slider;
