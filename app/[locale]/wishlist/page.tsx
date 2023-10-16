'use client';

import { db } from '@/app/firebase/firebase';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
	collection,
	doc,
	setDoc,
	getDoc,
	getDocs,
	query,
} from 'firebase/firestore';

const WishlistPage = () => {
	const userData = useAppSelector((state) => state.games.userData);

	async function setUserData() {
		const citiesRef = collection(db, 'usersData');
		const wishList = {
			['game1']: {
				id: 'ololo',
				namespace: '2',
			},
			game2: {
				id: '1',
				namespace: '2',
			},
		};

		const cart = {
			game3: {
				id: '1',
				namespace: '2',
			},
			game4: {
				id: '1',
				namespace: '2',
			},
		};

		await setDoc(doc(citiesRef, userData.email), {
			wishList: wishList,
			cart: cart,
		});
	}

	async function getUserData() {
		const docRef = doc(db, 'usersData', userData.email);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log(docSnap.data().cart);
			console.log(docSnap.data());
		} else {
			// docSnap.data() will be undefined in this case
			console.log('No such document!');
		}
	}

	return (
		<div>
			<button onClick={() => setUserData()}>add user data</button>
			<button onClick={() => getUserData()}>get user data</button>
		</div>
	);
};

export default WishlistPage;
