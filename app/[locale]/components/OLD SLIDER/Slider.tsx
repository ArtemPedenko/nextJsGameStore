// @ts-nocheck
'use client';

import styled from 'styled-components';
import { FC, useEffect, useState, useRef } from 'react';
//import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
//import { setGamesData, setChosenGames } from "@/app/store/slice";
import SliderElement from './Slider/SliderElement';

interface sliderProps {
	data: any;
}

const SliderWrapper = styled.div`
	width: 1427px;
	height: 462px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;

	border: 1px solid green;
`;

const Slider: FC<sliderProps> = ({ data }) => {
	const [currentPosition, setCurrentPosition] = useState('0px');
	const [nextPosition, setNextPosition] = useState('0px');
	const [animation, setAnimation] = useState('0');
	const [count, setCount] = useState(0);
	const sliderRef = useRef('');

	console.log('currentPosition', currentPosition);
	console.log('nextPosition', nextPosition);

	function sliderRight() {
		if (
			sliderRef.current.scrollWidth - 2000 <=
			+nextPosition.replace('px', '').replace('-', '')
		) {
			return null;
		} else {
			const position = +nextPosition.replace('px', '');
			setCurrentPosition(nextPosition);
			setNextPosition(position - 1457 + 'px');

			setAnimation('1');
		}
	}

	function sliderLeft() {
		const position = +nextPosition.replace('px', '');
		setCurrentPosition(nextPosition);
		setNextPosition(position + 1457 + 'px');
		setAnimation('1');
	}

	return (
		<>
			<SliderWrapper>
				{data.title}

				<div
					ref={sliderRef}
					style={{
						display: 'flex',
						flexDirection: 'row',
						overflow: 'hidden',
					}}
				>
					<SliderElement
						data={data.offers}
						animation={animation}
						setAnimation={setAnimation}
						currentPosition={currentPosition}
						nextPosition={nextPosition}
					/>
				</div>
				<button
					onClick={() => {
						sliderRight();
					}}
				>
					right
				</button>
				<button onClick={() => sliderLeft()}>left</button>
			</SliderWrapper>
		</>
	);
};

export default Slider;
