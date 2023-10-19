import { FC } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import { useI18n } from '@/locales/client';

const Wrapper = styled.div`
	width: 100%;
`;
const PiceBlock = styled.div`
	display: flex;
	justify-content: space-between;
`;

interface IOffer {
	totalPrice: number;
}

const Offer: FC<IOffer> = ({ totalPrice }) => {
	const t = useI18n();

	return (
		<Wrapper>
			<h3>{t('summary')}</h3>
			<PiceBlock>
				<p>{t('price')}</p>
				<p>{totalPrice}</p>
			</PiceBlock>
			<Button $contained>{t('buy')}</Button>
		</Wrapper>
	);
};

export default Offer;
