"use client";

import styled from "styled-components";
import { FC } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "./carouselSwiper.css";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/pagination";

interface CarouselThumbnailProps {
  chosenGames: any;
}

const CarouselSwiperWrapper = styled.div`
  max-width: 1427px;
  width: 90%;
  margin: 0 auto;
  display: none;
  @media (max-width: 858px) {
    display: block;
  }
`;

const GameInfo = styled.div`
  position: absolute;
  bottom: 5%;
  left: 3%;
  width: 80%;
  color: #ffffff;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 16px;
  text-shadow: 0px 0px 5px black;
`;

const CarouselSwiper: FC<CarouselThumbnailProps> = ({ chosenGames }) => {
  return (
    <CarouselSwiperWrapper>
      <Swiper
        slidesPerView={"auto"}
        loop={false}
        pagination={{
          clickable: false,
        }}
        modules={[Pagination]}
        className="carousel-swiper-container-slider"
      >
        {chosenGames.map((item: any, index: number) => {
          const productLink = item.link.src.replace("/p/", "");
          return (
            <SwiperSlide className="carousel-swiper-slide-slider" key={index}>
              <Link
                href={`${productLink}/${item.offer.id}/${item.offer.namespace}`}
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <img
                  className="carousel-slide-img-slider"
                  alt=""
                  src={item.mobileImage.src}
                />
              </Link>
              <GameInfo>
                <div> {item.title} </div>
                <div> {item.eyebrow}</div>
                <div> {item.description}</div>
              </GameInfo>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </CarouselSwiperWrapper>
  );
};

export default CarouselSwiper;
