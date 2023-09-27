"use client";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setGamesData, setChosenGames } from "@/app/store/slice";

interface epicProps {
  data: any;
}

const Fetching: FC<epicProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const chosenGames = useAppSelector((state) => state.games.chosenGames);
  const carouselItems = data[0].slides.slice(1, 6);

  useEffect(() => {
    dispatch(setGamesData(data));
    dispatch(setChosenGames(carouselItems));
  }, []);

  return <></>;
};

export default Fetching;
