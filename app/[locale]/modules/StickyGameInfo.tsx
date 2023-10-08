// @ts-nocheck

'use client';

import { FC, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useI18n } from '@/locales/client';
import Button from '../components/Button';

interface gameInfoProps {
	data: any;
	offerData: any;
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #121212;
	width: 320px;
	height: 500px;
	color: white;
	gap: 15px;
	position: relative;
	top: 200px;
`;

const StickyGameInfo: FC<gameInfoProps> = ({ data, offerData }) => {
	//console.log(data);
	//console.log(offerData);
	//
	const t = useI18n();

	return (
		<Wrapper>
			<div style={{ position: 'sticky', top: '200px' }}>
				<h2>{offerData.title}</h2>
				<div style={{ color: '#b8b8b8' }}>
					{offerData.offerType === 'BASE_GAME' ? t('base_game') : <></>}
				</div>
				{offerData.price === 0 ? <div>{offerData.price}</div> : null}

				<Button>{t('buy')}</Button>
				<Button>{t('add_to_cart')}</Button>
				<Button>{t('add_to_wishlist')}</Button>
			</div>
		</Wrapper>
	);
};

export default StickyGameInfo;
