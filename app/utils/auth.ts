import { auth } from '../firebase/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setUserData } from '@/app/store/slice';
import { useRouter } from 'next/navigation';

const dispatch = useAppDispatch();
const { push } = useRouter();

async function registerUser(
	userEmail: string,
	userPass: string,
	userName: string
) {
	await createUserWithEmailAndPassword(auth, userEmail, userPass)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			dispatch(setUserData(user));
			// ...
		})
		.then(() => {
			if (auth.currentUser) {
				updateProfile(auth.currentUser, {
					displayName: userName,
				});
			}
			push('./');
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
			// ..
		});
}

async function loginUser(userEmail: string, userPass: string) {
	signInWithEmailAndPassword(auth, userEmail, userPass)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			dispatch(setUserData(user));
			push('./');
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		});
}

async function sighOut() {
	signOut(auth)
		.then(() => {
			// Sign-out successful.
			console.log('Signed out successfully');
		})
		.catch((error) => {
			// An error happened.
		});
}

export { sighOut, loginUser, registerUser };
