"use client";

import styled from "styled-components";
import Slider from "./Carousel/Slider";
import CarouselThumbnail from "./Carousel/CarouselThumbnail";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setAnimationCurrent, setAnimationPrevious } from "@/app/store/slice";

const CarouselWrapper = styled.div`
  width: 1427px;
  height: 640;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const SliderWrapper = styled.div`
  width: 1140px;
  height: 640px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  border-radius: 16px;
`;

const CarouselThumbnailWrapper = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;
`;

export default function Carousel() {
  const chosenGames = useAppSelector((state) => state.games.chosenGames);
  const animationPrevious = useAppSelector(
    (state) => state.games.animation.previous,
  );
  const animationCurrent = useAppSelector(
    (state) => state.games.animation.current,
  );
  const dispatch = useAppDispatch();

  function chooseCarousel(index: number) {
    dispatch(setAnimationPrevious(animationCurrent));
    dispatch(setAnimationCurrent(index));
  }

  function animationController() {
    if (animationCurrent === chosenGames.length - 1) {
      dispatch(setAnimationPrevious(chosenGames.length - 1));
      dispatch(setAnimationCurrent(0));
      return;
    }
    dispatch(setAnimationPrevious(animationCurrent));
    dispatch(setAnimationCurrent(animationCurrent + 1));
  }
  let itemPrevious = chosenGames[animationPrevious];
  return (
    <CarouselWrapper>
      <SliderWrapper>
        {chosenGames.map((item, index) => {
          return (
            <Slider
              key={item.offer.id}
              props={{ item, index, animationCurrent, itemPrevious }}
            />
          );
        })}
      </SliderWrapper>
      <CarouselThumbnailWrapper>
        {chosenGames.map((item, index) => {
          return (
            <>
              <CarouselThumbnail
                key={item.offer.namespace}
                props={{
                  item,
                  animationCurrent,
                  chooseCarousel,
                  index,
                  animationController,
                }}
              />
            </>
          );
        })}
      </CarouselThumbnailWrapper>
    </CarouselWrapper>
  );
}
