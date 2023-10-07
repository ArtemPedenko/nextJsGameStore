// @ts-nocheck
'use client';

import styled from 'styled-components';
import { FC, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import IconWrapper from './IconWrapper';
import SlierArrowLeft from './Slider/SliderArrowLeft';
import SliderArrowRight from './Slider/SliderArrowRight';
import { useI18n } from '@/locales/client';
import './Slider/slider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface sliderProps {
	data: any;
}

const SliderWrapper = styled.div`
	max-width: 1427px;
	width: 90%;
	height: 490px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	border: 1px solid red;
`;

const SliderHead = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0 0 18px 0;
`;

const SliderNavigation = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
`;

const SliderNavigationButton = styled.div`
	height: 30px;
	width: 30px;
	border-radius: 100%;
	background-color: #2a2a2a;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const Slider: FC<sliderProps> = ({ data }) => {
	//console.log(data);
	let sliderRef = useRef(null);
	const t = useI18n();

	function handleNext() {
		sliderRef?.current.swiper.slideNext();
	}

	function handlePrev() {
		sliderRef?.current.swiper.slidePrev();
	}

	return (
		<>
			<SliderWrapper>
				<SliderHead>
					{data.title}
					<SliderNavigation>
						<SliderNavigationButton onClick={() => handlePrev()}>
							<IconWrapper
								icon={<SlierArrowLeft />}
								height='20px'
								width='20px'
								margin='0 auto'
							/>
						</SliderNavigationButton>
						<SliderNavigationButton onClick={() => handleNext()}>
							<IconWrapper
								icon={<SliderArrowRight />}
								height='20px'
								width='20px'
								margin='0 auto'
							/>
						</SliderNavigationButton>
					</SliderNavigation>
				</SliderHead>
				<Swiper
					ref={sliderRef}
					slidesPerView={1}
					spaceBetween='30px'
					slidesPerGroup={1}
					breakpoints={{
						640: {
							slidesPerView: 2,
							spaceBetween: 20,
							slidesPerGroup: 2,
						},
						768: {
							slidesPerView: 4,
							spaceBetween: 40,
							slidesPerGroup: 4,
						},
						1024: {
							slidesPerView: 5,
							spaceBetween: 50,
							slidesPerGroup: 5,
						},
					}}
					loop='true'
					className='swiper-container-slider'
				>
					{data.offers.map((item: any, index: number) => {
						return (
							<SwiperSlide className='swiper-slide-slider' key={index}>
								<Link
									href={{
										pathname: `${item.url}`,
										query: { id: `${item.id}`, namespace: `${item.namespace}` },
									}}
									style={{
										textDecoration: 'none',
										color: 'white',
									}}
								>
									<img
										className='slide-img-slider'
										alt=''
										src={item.imageUrl}
									/>
									<div style={{ fontSize: '16px' }}>{item.gameName} </div>
									<div>{item.price}</div>
								</Link>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</SliderWrapper>
		</>
	);
};

export default Slider;
