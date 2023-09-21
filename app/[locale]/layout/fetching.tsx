"use client";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setGamesData, setChosenGames } from "@/app/store/slice";

interface epicProps {
  data: any;
}

const Fetching: FC<epicProps> = ({ data }) => {
  console.log(data.data.Storefront.storefrontModulesPaginated.modules);
  const dispatch = useAppDispatch();
  const chosenGames = useAppSelector((state) => state.games.chosenGames);
  const carouselItems =
    data.data.Storefront.storefrontModulesPaginated.modules[0].slides.slice(
      1,
      6,
    );

  useEffect(() => {
    dispatch(setGamesData(data));
    dispatch(setChosenGames(carouselItems));
  }, []);

  //console.log(chosenGames)
  //console.log(data);
  return <></>;
};

export default Fetching;
