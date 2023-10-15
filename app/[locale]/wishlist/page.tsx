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
	console.log(userData);

	async function setUserData() {
		const citiesRef = collection(db, 'usersData');

		await setDoc(doc(citiesRef, userData.email), {
			wishList: ['game1', 'game2'],
		});
	}

	async function getUserData() {
		const docRef = doc(db, 'usersData', userData.email);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log(docSnap.data().wishList);
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
