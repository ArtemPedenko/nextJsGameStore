'use client';

import styled from 'styled-components';
import SearchField from './HeaderSticky/SearchField';
import HeaderStickyButton from './HeaderSticky/HeaderStickyButton';
import { useI18n, useScopedI18n } from '../../../locales/client';

const Wrapper = styled.div`
	height: 100px;
	background-color: #121212;
	position: sticky;
	top: 0;
	z-index: 9;
`;

const StickyHead = styled.div`
	display: flex;
	align-items: center;
	height: 100px;
	width: 1430px;
	background-color: #121212;
	margin-left: auto;
	margin-right: auto;
	flex-wrap: wrap;
	gap: 0 20px;
`;

export default function HeaderSticky() {
	const t = useI18n();

	return (
		<Wrapper>
			<StickyHead>
				<SearchField />
				<HeaderStickyButton href='/'>{t(`discover`)}</HeaderStickyButton>
				<HeaderStickyButton href='/'>{t(`browse`)}</HeaderStickyButton>
				<HeaderStickyButton href='/'>{t(`news`)}</HeaderStickyButton>
			</StickyHead>
		</Wrapper>
	);
}
