"use client";

import styled from "styled-components";
import { FC, useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setGamesData, setChosenGames } from "@/app/store/slice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Slider/slider.css";

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
        <Swiper
          navigation={true}
          slidesPerView={6}
          spaceBetween={10}
          modules={[Navigation]}
          className="mySwiper"
        >
          {data.offers.map((item: any, index: number) => {
            let imgUrl = "";
            item.offer.keyImages.map((imgs: any) => {
              if (imgs.type === "Thumbnail") {
                imgUrl = imgs.url;
              }
            });
            return (
              <div key={index}>
                <SwiperSlide>
                  <img alt="" src={imgUrl} />
                </SwiperSlide>
              </div>
            );
          })}
        </Swiper>
      </SliderWrapper>
    </>
  );
};

export default Slider;
