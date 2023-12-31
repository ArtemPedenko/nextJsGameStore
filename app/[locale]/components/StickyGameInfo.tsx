'use client';

import { FC } from 'react';
import styled from 'styled-components';
import { useI18n } from '@/locales/client';
import Button from './Button';
import { addToWishlist, addToCart } from '@/app/utils/firebaseDb';
import { useAppSelector } from '@/app/store/hooks';

interface gameInfoProps {
	offerData: {
		description: string;
		offerType: string;
		price: string;
		title: string;
		developer: string;
		genres: {
			id: string;
			name: string;
			groupName: string;
		}[];
		id: string;
		namespace: string;
		thumbnail: string;
	};
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

const StickyGameInfo: FC<gameInfoProps> = ({ offerData }) => {
	const t = useI18n();
	const userData = useAppSelector((state) => state.games.userData);

	return (
		<Wrapper>
			<GameOfferInfo>
				<h2>{offerData.title}</h2>
				<div style={{ color: '#b8b8b8' }}>
					{offerData.offerType === 'BASE_GAME' ? t('base_game') : <></>}
				</div>
				{offerData.price === '0' ? null : <div>{offerData.price}</div>}

				<Button>{t('buy')}</Button>
				<Button
					onClick={() =>
						addToCart(
							userData.email,
							offerData.id,
							offerData.namespace,
							offerData.title,
							offerData.thumbnail,
							offerData.price
						)
					}
				>
					{t('add_to_cart')}
				</Button>
				<Button
					onClick={() =>
						addToWishlist(
							userData.email,
							offerData.id,
							offerData.namespace,
							offerData.title,
							offerData.thumbnail,
							offerData.price
						)
					}
				>
					{t('add_to_wishlist')}
				</Button>
			</GameOfferInfo>
		</Wrapper>
	);
};

export default StickyGameInfo;
