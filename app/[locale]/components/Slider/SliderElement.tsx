import styled, { keyframes } from "styled-components";
import { FC, useEffect, useState } from "react";
import Keyframes from "styled-components/dist/models/Keyframes";

const carousel = keyframes`
  from {
    left: 1140px;
    opacity: 0;
  }
  85% {
    opacity: 0.5;
  }
  to {
    left: 0px;
    opacity: 1;
  }
`;

/* const SliderImg = styled.img`
  position: relative;
  left: 0px;
  object-fit: cover;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  animation:${(props) => (props.animation === 1 ? "1000ms ${carousel} cubic-bezier(1, 0.06, 0.01, 0.89)" : "none")};
`; */

interface SliderImgProps {
  animation: any;
}

/* const SliderImg = styled.img<SliderImgProps>((props) => ({
  position: "relative",
  left: "0px",
  objectFit: "cover",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  animation: props.animation === 1 ? "`5000ms ${carousel} linear`" : "none",
})); */

const SliderImg = styled.img<{ animation?: any }>`
position: "relative",
left: "0px",
objectFit: "cover",
width: "100%",
height: "100%",
backgroundColor: "rgba(0, 0, 0, 0.8)",
animation: ${(props) =>
  props.animation === "1" ? "5000ms slideLeft linear" : "none" || "none"},
 @keyframes slideLeft {
    from {
        left: 1140px;
        opacity: 0;
      }
      85% {
        opacity: 0.5;
      }
      to {
        left: 0px;
        opacity: 1;
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
      {data.map((item, index) => {
        let imgUrl = "";
        item.offer.keyImages.map((imgs) => {
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
              animation={animation}
              onAnimationEnd={() => console.log("asdasdasdasdasdasd")}
            />
          </div>
        );
      })}
    </>
  );
};

export default SliderElement;
