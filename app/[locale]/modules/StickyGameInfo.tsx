'use client';

import { FC, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import SearchField from './HeaderSticky/SearchField';
import HeaderStickyButton from './HeaderSticky/HeaderStickyButton';
import { useI18n, useScopedI18n } from '../../../locales/client';

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
	border-radius: 6px;
	color: white;

	border: 1px solid red;
`;

const StickyGameInfo: FC<gameInfoProps> = ({ data, offerData }) => {
	//console.log(data);
	//console.log(offerData);
	//
	const t = useI18n();

	if (data) {
		return (
			<Wrapper>
				<img
					alt=''
					src={data?.Product.sandbox.configuration[0].configs.keyImages[0].url}
					style={{
						width: '280px',
						padding: '20px',
						border: '1px solid red',
					}}
				/>
				<div>
					{offerData.Catalog.catalogOffer.offerType === 'BASE_GAME' ? (
						t('base_game')
					) : (
						<></>
					)}
				</div>
			</Wrapper>
		);
	}
};

export default StickyGameInfo;
//Product.sandbox.configuration[0].configs.keyImages[0].url
