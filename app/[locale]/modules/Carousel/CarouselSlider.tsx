// @ts-nocheck
'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';
import { useI18n } from '@/locales/client';
import Button from '../../components/Button';

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
	background-color: rgba(0, 0, 0, 0.8);
	animation: 200ms ${carousel} cubic-bezier(1, 0.06, 0.01, 0.89);
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
	bottom: 50px;
	left: 40px;
	width: 480px;
	color: #ffffff;
	display: flex;
	flex-direction: column;
	gap: 20px;
	font-size: 20px;
	animation: 200ms ${carousel} cubic-bezier(0.77, 1.01, 0.9, 0.63);
`;

const GameName = styled.div`
	position: absolute;
	bottom: 250px;
	left: 40px;
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

interface SliderProps {
	props: {
		item: any;
		index: number;
		animationCurrent: number;
		itemPrevious: any;
	};
}

const CarouselSlider: FC<SliderProps> = ({ props }) => {
	const { item, index, animationCurrent, itemPrevious } = props;
	const t = useI18n();
	return (
		<>
			{animationCurrent === index ? (
				<>
					<SliderImgPrevious src={itemPrevious.image.src} alt='img' />
					<SliderImg src={item.image.src} alt='img' />
					<GameName>
						{item.logoImage.src ? (
							<img alt='img' src={item.logoImage.src} />
						) : null}
					</GameName>
					<GameInfo>
						<div style={{ textShadow: '2px 2px 5px black' }}>
							{item.eyebrow}
							<br />
							{item.description}
						</div>
						<ButtonWrapper>
							<Button $contained>{t(`buy`)}</Button>
						</ButtonWrapper>
					</GameInfo>
				</>
			) : null}
		</>
	);
};

export default CarouselSlider;
