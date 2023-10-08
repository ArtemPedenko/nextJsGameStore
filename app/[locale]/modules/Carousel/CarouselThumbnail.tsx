'use client';

import styled from 'styled-components';
import { FC } from 'react';
import Link from 'next/link';

const AnimationWrapper = styled.div`
	height: 125px;
	width: 256px;
	position: relative;
	display: flex;
	align-items: center;
	&:hover {
		cursor: pointer;
		background-color: #252525;
		border-radius: 10px;
	}
`;

const Box = styled.div`
	height: 125px;
	width: 256px;
	background-color: #252525;
	position: relative;
	overflow: hidden;
	border-radius: 10px;
	display: flex;
	align-items: center;
`;

const InnerBox = styled.div`
	height: 125px;
	width: 256px;
	background-color: #505050;
	position: absolute;
	animation-name: color;
	animation-duration: 7s;
	left: -256px;
	animation-timing-function: linear;
	color: white;

	@keyframes color {
		from {
			left: -256px;
		}
		to {
			left: 0px;
		}
	}
`;

const GameCard = styled.div`
	height: 100%;
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
	overflow: hidden;
	padding: 0 15px;
`;

const ImgContainer = styled.img<{ $anim?: string }>`
	width: 60px;
	height: 80px;
	object-fit: cover;
	border-radius: 8px;
	animation-name: ${(props) => props.$anim || 'none'};
	animation-duration: 400ms;
	animation-timig-function: cubic-bezier(0.17, 0.17, 0.23, 1);
	animation-iteration-count: 1;
	@keyframes pulse {
		from {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		to {
			transform: scale(1);
		}
	}
`;

interface CarouselThumbnailProps {
	props: {
		item: any;
		index: number;
		chooseCarousel: Function;
		animationCurrent: number;
		animationController: Function;
	};
}

const CarouselThumbnail: FC<CarouselThumbnailProps> = ({ props }) => {
	const { item, index, animationCurrent, chooseCarousel, animationController } =
		props;

	return (
		<AnimationWrapper>
			{animationCurrent === index ? (
				<Link
					href={{
						pathname: `${item.link.src}`,
						query: {
							id: `${item.offer.id}`,
							namespace: `${item.offer.namespace}`,
						},
					}}
					style={{ textDecoration: 'none', color: 'white' }}
				>
					<Box>
						<InnerBox onAnimationEnd={() => animationController()} />
						<GameCard>
							<ImgContainer $anim='pulse' alt='game' src={item.thumbnail.src} />
							{item.title}
						</GameCard>
					</Box>
				</Link>
			) : (
				<GameCard onClick={() => chooseCarousel(index)}>
					<ImgContainer alt='game' src={item.thumbnail.src} />
					{item.title}
				</GameCard>
			)}
		</AnimationWrapper>
	);
};

export default CarouselThumbnail;
