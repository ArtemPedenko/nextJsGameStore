'use client';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setGamesData, setChosenGames } from '@/app/store/slice';

interface epicProps {
	data: any;
}

const Fetching: FC<epicProps> = ({ data }) => {
	/* console.log(data); */
	const dispatch = useAppDispatch();
	const chosenGames = useAppSelector((state) => state.games.chosenGames);

	let carouselItems: any;

	data.map((item: { id: string; slides: any[] }) => {
		if (item.id === 'new-carousel-definitive') {
			carouselItems = item.slides.slice(1, item.slides.length);
		}
	});

	useEffect(() => {
		dispatch(setGamesData(data));
		dispatch(setChosenGames(carouselItems));
	}, []);
	//console.log(data);

	return <></>;
};

export default Fetching;
