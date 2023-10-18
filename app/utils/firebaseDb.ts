import { db } from '@/app/firebase/firebase';
import {
	collection,
	doc,
	setDoc,
	getDoc,
	getDocs,
	deleteDoc,
	query,
	updateDoc,
	deleteField,
	FieldValue,
} from 'firebase/firestore';

async function addToWishlist(
	userEmail: string,
	id: string,
	namespace: string,
	title: string,
	thumbnail: string,
	price: string
) {
	const docRef = doc(db, 'usersData', userEmail + '&wishList');
	setDoc(
		docRef,
		{ [title]: { id: id, namespace: namespace, thumbnail, price } },
		{ merge: true }
	);
}

async function addToCart(
	userEmail: string,
	id: string,
	namespace: string,
	title: string,
	thumbnail: string,
	price: string
) {
	const docRef = doc(db, 'usersData', userEmail + '&cart');
	setDoc(
		docRef,
		{ [title]: { id: id, namespace: namespace, thumbnail, price } },
		{ merge: true }
	);
}

async function deleteFromWishlist(userEmail: string, title: string) {
	const cityRef = doc(db, 'usersData', userEmail + '&wishList');
	await updateDoc(cityRef, {
		[title]: deleteField(),
	});
}

async function getUserWishlist(userEmail: string) {
	const docRef = doc(db, 'usersData', userEmail + '&wishList');
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		//console.log(docSnap.data().cart);
		//console.log(docSnap.data());
		const data = docSnap.data();
		return data;
	} else {
		// docSnap.data() will be undefined in this case
		console.log('No such document!');
	}
}

export { addToWishlist, addToCart, deleteFromWishlist, getUserWishlist };
