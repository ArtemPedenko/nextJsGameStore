"use client";

import styled, { keyframes } from "styled-components";
import { FC, useEffect, useState } from "react";
import Keyframes from "styled-components/dist/models/Keyframes";

const SliderImgRight = styled.img<{
  currentPosition?: any;
  nextPosition?: any;
  anim?: any;
}>`
  position: relative;
  margin-right: 31px;
  left: ${(props) => props.nextPosition};
  animation: ${(props) =>
    props.anim === "1" ? "1000ms slideLeft linear" : "none"};
  animation-fill-mode: forwards;
  @keyframes slideLeft {
    from {
      left: ${(props) => props.currentPosition};
    }
    to {
      left: ${(props) => props.nextPosition};
    }
  }
`;

interface sliderElementProps {
  data: any;
  animation: string;
  setAnimation: Function;
  currentPosition: string;
  nextPosition: string;
}

const SliderElement: FC<sliderElementProps> = ({
  data,
  animation,
  setAnimation,
  currentPosition,
  nextPosition,
}) => {
  //console.log(animation);
  //console.log(data);
  return (
    <>
      {data.map((item: any, index: number) => {
        let imgUrl = "";
        item.offer.keyImages.map((imgs: any) => {
          if (imgs.type === "Thumbnail") {
            imgUrl = imgs.url;
          }
        });
        return (
          <div key={index}>
            <SliderImgRight
              alt=""
              src={imgUrl}
              style={{
                height: "280px",
                width: "212px",
                objectFit: "cover",
              }}
              anim={animation}
              currentPosition={currentPosition}
              nextPosition={nextPosition}
              onAnimationEnd={() => {
                setAnimation("0");
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default SliderElement;