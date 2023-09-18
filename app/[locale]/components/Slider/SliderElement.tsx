"use client";

import styled, { keyframes } from "styled-components";
import { FC, useEffect, useState } from "react";
import Keyframes from "styled-components/dist/models/Keyframes";

const SliderImg = styled.img<{ anim?: any }>`
  position: relative;
  left: 0px;
  objectfit: cover;
  width: 100%;
  height: 100%;
  animation: ${(props) =>
    props.anim === "1" ? "5000ms slideLeft linear" : "none"};
  @keyframes slideLeft {
    from {
      left: 1427px;
    }
    to {
      left: 0px;
    }
  }
`;

//

interface sliderElementProps {
  data: any;
  animation: string;
  setAnimation: Function;
}

const SliderElement: FC<sliderElementProps> = ({
  data,
  animation,
  setAnimation,
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
            <SliderImg
              alt=""
              src={imgUrl}
              style={{
                height: "280px",
                width: "210px",
                objectFit: "cover",
              }}
              anim={animation}
              onAnimationEnd={() => setAnimation("0")}
            />
          </div>
        );
      })}
    </>
  );
};

export default SliderElement;
