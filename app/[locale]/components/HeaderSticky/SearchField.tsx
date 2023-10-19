'use client';

import styled from 'styled-components';
import IconWrapper from '../IconWrapper';
import SearchLogo from '@/images/SearchLogo';
import { useI18n } from '@/locales/client';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { setSearchGames } from '@/app/store/slice';
import { useEffect } from 'react';

let myInterval: any;

const SearchContainer = styled.div`
	position: relative;
	display: flex;
	background-color: #202020;
	height: 40px;
	width: 230px;
	align-items: center;
	border-radius: 24px;
`;

const Search = styled.input`
	background-color: #202020;
	height: 35px;
	width: 180px;
	color: white;
	outline: none;
	border: 0;
	border-radius: 24px;
	&:focus: {
		background-color: red;
	}
`;

const SearchingGames = styled.div`
	background-color: #2a2a2a;
	position: absolute;
	top: 110%;
	width: 200%;
	max-width: 90vw;
	height: 300px;
	border-radius: 8px;
	z-index: 12;
	box-shadow: 13px 13px 8px 0px rgba(0, 0, 0, 0.35);
`;

const SearchField = () => {
	const t = useI18n();
	const dispatch = useAppDispatch();
	const searchGames = useAppSelector((state) => state.games.searchGames);

	function delaySearching(searchText: string) {
		if (searchText === '') {
			dispatch(setSearchGames([]));
		}
		clearInterval(myInterval);
		myInterval = setInterval(getSearchingData, 1000, searchText);
	}

	async function getSearchingData(searchText: string) {
		clearInterval(myInterval);
		fetch(`/en/api/searchfield?search=${searchText}`)
			.then((serverPromise) => {
				serverPromise
					.json()
					.then((data) => {
						console.log(data.data.Catalog.searchStore.elements);
						dispatch(setSearchGames(data.data.Catalog.searchStore.elements));
					})
					.catch((e) => {
						console.log(e);
					});
			})
			.catch((e) => {
				console.log(e);
			});
	}

	return (
		<SearchContainer>
			<IconWrapper
				icon={<SearchLogo />}
				height='18px'
				width='18px'
				margin='0'
				padding='10px'
			/>
			<Search
				placeholder={t(`search`)}
				onChange={(e) => delaySearching(e.target.value)}
			></Search>
			{searchGames.length ? <SearchingGames>{'asd'}</SearchingGames> : null}
		</SearchContainer>
	);
};

export default SearchField;
