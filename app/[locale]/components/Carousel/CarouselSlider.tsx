"use client";

import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { FC } from "react";
import { useI18n } from "@/locales/client";
import Button from "../Button";

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

const SliderImg = styled.img`
  position: relative;
  left: 0px;
  object-fit: cover;
  width: 100%;
  height: 100%;
  filter: brightness(90%);
  animation: 200ms ${carousel} cubic-bezier(1, 0.06, 0.01, 0.89);
`;

const LogoImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const SliderImgPrevious = styled.img`
  position: absolute;
  left: 0px;
  object-fit: cover;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  animation-name: slideLeft;
  animation-duration: 200ms;
  animation-timing-function: cubic-bezier(1, 0.06, 0.01, 0.89);
  @keyframes slideLeft {
    from {
      left: 0;
      opacity: 1;
    }
    to {
      left: -1140px;
      opacity: 0;
    }
  }
`;

const GameInfo = styled.div`
  position: absolute;
  bottom: 3%;
  left: 3%;
  width: 456px;
  color: #ffffff;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 20px;
  animation: 200ms ${carousel} cubic-bezier(0.77, 1.01, 0.9, 0.63);
`;

const GameName = styled.div`
  position: absolute;
  width: 30%;
  bottom: 35%;
  left: 3%;
  font-size: 40px;
  text-shadow: 2px 2px 5px black;
  animation-name: slide;
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.69, 0, 0.83, 0.83);
  @keyframes slide {
    from {
      left: 1140px;
      opacity: 0;
    }
    90% {
      opacity: 0;
    }
    to {
      left: 40px;
      opacity: 1;
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 200px;
`;

type Tsrc = {
  src: string;
};

interface SliderProps {
  props: {
    item: {
      link: Tsrc;
      image: Tsrc;
      logoImage: Tsrc;
      eyebrow: string;
      description: string;
      offer: {
        id: string;
        namespace: string;
      };
    };
    index: number;
    animationCurrent: number;
    itemPrevious: {
      image: Tsrc;
    };
  };
}

const CarouselSlider: FC<SliderProps> = ({ props }) => {
  const { item, index, animationCurrent, itemPrevious } = props;
  const t = useI18n();
  const productLink = item.link.src.replace("/p/", "");
  return (
    <>
      {animationCurrent === index ? (
        <>
          <SliderImgPrevious src={itemPrevious.image.src} alt="img" />
          <SliderImg src={item.image.src} alt="img" />
          <GameName>
            {item.logoImage.src ? (
              <LogoImage alt="img" src={item.logoImage.src} />
            ) : null}
          </GameName>
          <GameInfo>
            <div style={{ textShadow: "2px 2px 5px black" }}>
              {item.eyebrow}
              <br />
              {item.description}
            </div>
            <ButtonWrapper>
              <Link
                href={`${productLink}/${item.offer.id}/${item.offer.namespace}`}
              >
                <Button $contained>{t(`buy`)}</Button>
              </Link>
            </ButtonWrapper>
          </GameInfo>
        </>
      ) : null}
    </>
  );
};

export default CarouselSlider;
