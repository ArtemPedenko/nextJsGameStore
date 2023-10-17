// @ts-nocheck

'use client';

import { FC, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useI18n } from '@/locales/client';
import Button from './Button';

interface gameInfoProps {
	data: any;
	offerData: any;
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #121212;
	width: 25%;
	color: white;
	gap: 15px;
	@media (max-width: 768px) {
		width: 100%;
	}
`;

const GameOfferInfo = styled.div`
	position: sticky;
	top: 100px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 15px;
	margin-top: 30px;
`;

const StickyGameInfo: FC<gameInfoProps> = ({ data, offerData }) => {
	const t = useI18n();
	console.log(offerData.price);

	return (
		<Wrapper>
			<GameOfferInfo>
				<h2>{offerData.title}</h2>
				<div style={{ color: '#b8b8b8' }}>
					{offerData.offerType === 'BASE_GAME' ? t('base_game') : <></>}
				</div>
				{offerData.price === '0' ? null : <div>{offerData.price}</div>}

				<Button>{t('buy')}</Button>
				<Button>{t('add_to_cart')}</Button>
				<Button>{t('add_to_wishlist')}</Button>
			</GameOfferInfo>
		</Wrapper>
	);
};

export default StickyGameInfo;