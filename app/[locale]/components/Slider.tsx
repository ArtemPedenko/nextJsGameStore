"use client";

import styled from "styled-components";
import { FC, useEffect, useState, useRef } from "react";
import IconWrapper from "./IconWrapper";
import SlierArrowLeft from "./Slider/SliderArrowLeft";
import SliderArrowRight from "./Slider/SliderArrowRight";
import { useI18n } from "@/locales/client";
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
`;

const SliderHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 18px 0;
`;

const SliderNavigation = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SliderNavigationButton = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: #2a2a2a;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Slider: FC<sliderProps> = ({ data }) => {
  let sliderRef = useRef(null);
  const t = useI18n();

  function handleNext() {
    sliderRef?.current.swiper.slideNext();
  }

  function handlePrev() {
    sliderRef?.current.swiper.slidePrev();
  }

  return (
    <>
      <SliderWrapper>
        <SliderHead>
          {data.title}
          <SliderNavigation>
            <SliderNavigationButton onClick={() => handlePrev()}>
              <IconWrapper
                icon={<SlierArrowLeft />}
                height="20px"
                width="20px"
                margin="0 auto"
              />
            </SliderNavigationButton>
            <SliderNavigationButton onClick={() => handleNext()}>
              <IconWrapper
                icon={<SliderArrowRight />}
                height="20px"
                width="20px"
                margin="0 auto"
              />
            </SliderNavigationButton>
          </SliderNavigation>
        </SliderHead>
        <swiper-container
          ref={sliderRef}
          slides-per-view="6"
          space-between="30px"
          slides-per-group={6}
          loop="true"
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
                {item.offer.categories[0] === "addons"
                  ? t(`addon`)
                  : t(`base_game`)}
                <div> {item.offer.title} </div>
                <div>
                  {" "}
                  {
                    item.offer.price.totalPrice.fmtPrice.originalPrice ===
                    item.offer.price.totalPrice.fmtPrice.discountPrice ? (
                      item.offer.price.totalPrice.fmtPrice.originalPrice
                    ) : (
                      <>
                        <s>
                          {item.offer.price.totalPrice.fmtPrice.originalPrice}
                        </s>
                        &nbsp;
                        {item.offer.price.totalPrice.fmtPrice.discountPrice}
                      </>
                    ) /* item.offer.price.totalPrice.fmtPrice.discountPrice */
                  }{" "}
                </div>
              </swiper-slide>
            );
          })}
        </swiper-container>
      </SliderWrapper>
    </>
  );
};

export default Slider;
