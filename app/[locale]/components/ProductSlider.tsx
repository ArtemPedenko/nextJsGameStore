'use client';

import styled from 'styled-components';
import { FC, useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import IconWrapper from './IconWrapper';
import SlierArrowLeft from './ProductSlider/SliderArrowLeft';
import SliderArrowRight from './ProductSlider/SliderArrowRight';
import { useI18n } from '@/locales/client';
import './ProductSlider/productSlider.css';
import { register } from 'swiper/element/bundle';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperRef, SwiperClass } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const SliderWrapper = styled.div`
	width: 1200px;
	height: 1000px;
	display: flex;
	flex-direction: column;
`;

const SliderHead = styled.div`
	display: flex;
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

interface sliderProps {
	data: any;
}

const ProductSlider: FC<sliderProps> = ({ data }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
	let myRef = useRef(null);
	const t = useI18n();

	function handleNext() {
		console.log(myRef?.current);
		myRef?.current.swiper.slideNext();
	}

	function handlePrev() {
		console.log(myRef?.current);
		myRef?.current.swiper.slidePrev();
	}

	if (data) {
		return (
			<>
				<SliderWrapper>
					<SliderHead>{data?.title}</SliderHead>
					<Swiper
						loop={true}
						spaceBetween={10}
						thumbs={{ swiper: thumbsSwiper }}
						modules={[FreeMode, Navigation, Thumbs]}
						className='mySwiper2'
					>
						{data.Product.sandbox.configuration[1].configs.keyImages.map(
							(item, index) => {
								let imgUrl = '';
								if (item.type === 'featuredMedia') {
									imgUrl = item.url;
									return (
										<SwiperSlide className='mySwiper2-slide' key={uuidv4()}>
											<img className='product-slide2-img' alt='' src={imgUrl} />
										</SwiperSlide>
									);
								}
							}
						)}
					</Swiper>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-around',
							alignItems: 'center',
							marginTop: '20px',
						}}
					>
						<SliderNavigationButton onClick={() => handlePrev()}>
							<IconWrapper
								icon={<SlierArrowLeft />}
								height='40px'
								width='40px'
								margin='auto auto'
							/>
						</SliderNavigationButton>

						<Swiper
							ref={myRef}
							onSwiper={setThumbsSwiper}
							spaceBetween={10}
							loop={true}
							slidesPerView={4}
							freeMode={true}
							watchSlidesProgress={true}
							modules={[FreeMode, Thumbs]}
							className='mySwiper'
							slidesPerGroup={4}
						>
							{data.Product.sandbox.configuration[1].configs.keyImages.map(
								(item, index) => {
									let imgUrl = '';
									if (item.type === 'featuredMedia') {
										imgUrl = item.url;
										return (
											<SwiperSlide className='mySwiper-slide' key={index}>
												<img
													className='product-slide-img'
													alt=''
													src={imgUrl}
												/>
											</SwiperSlide>
										);
									}
								}
							)}
						</Swiper>

						<SliderNavigationButton onClick={() => handleNext()}>
							<IconWrapper
								icon={<SliderArrowRight />}
								height='40px'
								width='40px'
								margin='auto auto'
							/>
						</SliderNavigationButton>
					</div>
				</SliderWrapper>
			</>
		);
	}
};
//

export default ProductSlider;
