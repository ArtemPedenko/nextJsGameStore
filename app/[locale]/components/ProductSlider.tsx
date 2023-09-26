"use client";

import styled from "styled-components";
import { FC, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import IconWrapper from "./IconWrapper";
import SlierArrowLeft from "./ProductSlider/SliderArrowLeft";
import SliderArrowRight from "./ProductSlider/SliderArrowRight";
import { useI18n } from "@/locales/client";
import "./ProductSlider/productSlider.css";
import { register } from "swiper/element/bundle";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
register();

const SliderWrapper = styled.div`
  width: 1200px;
  height: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const SliderHead = styled.div`
  display: flex;
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

const ProductSlider: FC<sliderProps> = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  console.log(data);
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
        <SliderHead>{data.title}</SliderHead>
        <swiper-container
          ref={sliderRef}
          loop={true}
          space-between={10}
          navigation={false}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {data.carousel?.items.map((item, index) => {
            let imgUrl = "";
            //console.log(item);
            if (item.image.src) {
              imgUrl = item.image.src;
              return (
                <swiper-slide key={index}>
                  <img class="product-slide-img" alt="" src={imgUrl} />
                </swiper-slide>
              );
            }
          })}
        </swiper-container>
      </SliderWrapper>
    </>
  );
};

export default ProductSlider;
