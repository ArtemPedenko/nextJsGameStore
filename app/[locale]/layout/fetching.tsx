"use client";
import { FC } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { setGamesData } from "@/app/store/slice";

interface epicProps {
    data: any;
}

const Fetching: FC<epicProps> = ({ data }) => {
    const dispatch = useAppDispatch();
    dispatch(setGamesData(data));

    console.log(data);
    return <></>;
}

export default Fetching;