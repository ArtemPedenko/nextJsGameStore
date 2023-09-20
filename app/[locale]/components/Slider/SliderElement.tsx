"use client";

import styled, { keyframes } from "styled-components";
import { FC, useEffect, useState } from "react";
import Keyframes from "styled-components/dist/models/Keyframes";

const SliderImgRight = styled.img<{ start?: any; end?: any; anim?: any }>`
  position: relative;
  margin-right: 31px;
  left: ${(props) => props.end};
  animation: ${(props) =>
    props.anim === "1" ? "500ms slideLeft linear" : "none"};
  animation-fill-mode: forwards;
  @keyframes slideLeft {
    from {
      left: ${(props) => props.start};
    }
    to {
      left: ${(props) => props.end};
    }
  }
`;

//

interface sliderElementProps {
  data: any;
  animation: string;
  setAnimation: Function;
  sliderFrom: string;
  sliderTo: string;
}

const SliderElement: FC<sliderElementProps> = ({
  data,
  animation,
  setAnimation,
  sliderFrom,
  sliderTo,
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
              start={sliderFrom}
              end={sliderTo}
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
