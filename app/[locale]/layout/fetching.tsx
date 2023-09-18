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
  const crouselItems =
    data.data.Storefront.storefrontModulesPaginated.modules[0].slides.slice(
      1,
      6,
    );

  useEffect(() => {
    dispatch(setGamesData(data));
    dispatch(setChosenGames(crouselItems));
  }, []);

  //console.log(chosenGames)
  //console.log(data);
  return <></>;
};

export default Fetching;
