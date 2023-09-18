import styled from "styled-components";
import { FC, useEffect, useState } from "react";

interface sliderElementProps {
  data: any;
}

const SliderElement: FC<sliderElementProps> = ({ data }) => {
  console.log(data);
  return (
    <>
      {data.map((item, index) => {
        let imgUrl = "";
        item.offer.keyImages.map((imgs) => {
          console.log(imgs);
          if (imgs.type === "Thumbnail") {
            imgUrl = imgs.url;
            console.log(imgUrl);
          }
        });
        return (
          <div key={index}>
            <img
              alt=""
              src={imgUrl}
              style={{
                height: "280px",
                width: "210px",
                objectFit: "cover",
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default SliderElement;
