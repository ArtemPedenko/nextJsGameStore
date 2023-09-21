"use client";

import styled from "styled-components";
import { FC, useEffect, useState, useRef } from "react";
import IconWrapper from "./IconWrapper";
import SlierArrowLeft from "./Slider/SliderArrowLeft";
import SliderArrowRight from "./Slider/SliderArrowRight";
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

const SliderHead = styled.div`
  display: flex;
  justify-content: space-between;
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
    swiperEl?.swiper.slideNext();
  }

  function handlePrev() {
    const swiperEl = document.querySelector("swiper-container");
    swiperEl?.swiper.slidePrev();
  }

  return (
    <>
      <SliderWrapper>
        <SliderHead>
          {data.title}
          <div>
          <IconWrapper
            icon={<SlierArrowLeft />}
            height="30px"
            width="30px"
            margin="0"
          />
          <IconWrapper
            icon={<SliderArrowRight />}
            height="30px"
            width="30px"
            margin="0"
          />
          </div>
          <button onClick={() => handleNext()}>next</button>
          <button onClick={() => handlePrev()}>prev</button>
        </SliderHead>
        <swiper-container
          ref={sliderRef}
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
      </SliderWrapper>
    </>
  );
};

export default Slider;
