"use client";

import styled from "styled-components";
import { FC, useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setGamesData, setChosenGames } from "@/app/store/slice";
import "./Slider/slider.css";
import { register } from "swiper/element/bundle";
register();

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
  const [currentPosition, setCurrentPosition] = useState("0px");
  const [nextPosition, setNextPosition] = useState("0px");
  const [animation, setAnimation] = useState("0");
  const [count, setCount] = useState(0);
  const sliderRef = useRef("");
  const navigationNextRef = useRef("");

  function handleNext() {
    const swiperEl = document.querySelector("swiper-container");
    swiperEl.swiper.slideNext();
  }

  function handlePrev() {
    const swiperEl = document.querySelector("swiper-container");
    swiperEl.swiper.slidePrev();
  }

  return (
    <>
      <SliderWrapper>
        {data.title}
        {/*    <SliderElement
            data={data.offers}
            animation={animation}
            setAnimation={setAnimation}
            currentPosition={currentPosition}
            nextPosition={nextPosition}
          /> */}

        <swiper-container
          ref={sliderRef}
          /* navigation="true" */
          slides-per-view="6"
          space-between="30px"
          slides-per-group={6}
        >
          {data.offers.map((item: any, index: number) => {
            let imgUrl = "";
            item.offer.keyImages.map((imgs: any) => {
              if (imgs.type === "Thumbnail") {
                imgUrl = imgs.url;
              }
            });
            return (
              <swiper-slide key={index}>
                <img class="slide-img" alt="" src={imgUrl} />
              </swiper-slide>
            );
          })}
        </swiper-container>
        <button onClick={() => handleNext()}>next</button>
        <button onClick={() => handlePrev()}>prev</button>
      </SliderWrapper>
    </>
  );
};

export default Slider;
