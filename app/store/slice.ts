import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state
interface gameState {
	email: string | null;
	gamesData: any;
	chosenGames: any[];
	modalOpen: boolean;
	animation: {
		previous: number;
		current: number;
	};
	searchGames: any[];
}
// Define the initial state using that type
const initialState: gameState = {
	email: null,
	gamesData: [],
	chosenGames: [],
	modalOpen: false,
	animation: {
		previous: 4,
		current: 0,
	},
	searchGames: [],
};

export const gameStore = createSlice({
	name: 'games',
	initialState,
	reducers: {
		putMail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setGamesData: (state, action: PayloadAction<Array<any>>) => {
			state.gamesData = action.payload;
		},
		setChosenGames: (state, action: PayloadAction<Array<any>>) => {
			state.chosenGames = action.payload;
		},
		setModalOpen: (state, action: PayloadAction<boolean>) => {
			state.modalOpen = action.payload;
		},
		setAnimationPrevious: (state, action: PayloadAction<any>) => {
			state.animation.previous = action.payload;
		},
		setAnimationCurrent: (state, action: PayloadAction<any>) => {
			state.animation.current = action.payload;
		},
		setSearchGames: (state, action: PayloadAction<any>) => {
			state.searchGames = action.payload;
		},
	},
});

export const {
	putMail,
	setGamesData,
	setChosenGames,
	setModalOpen,
	setAnimationPrevious,
	setAnimationCurrent,
	setSearchGames,
} = gameStore.actions;
export default gameStore.reducer;
