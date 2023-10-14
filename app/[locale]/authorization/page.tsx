'use client';

import styled from 'styled-components';
import { useI18n } from '@/locales/client';
import { auth } from '../../firebase/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setUserData } from '@/app/store/slice';
import { useRouter } from 'next/navigation';
import Login from './components/Login';
import Registration from './components/Registration';

const AuthorizationPage = styled.div`
	position: absolute;
	top: 50px;
	width: 100vw;
	height: 100vh;
	background-color: black;
	z-index: 12;
`;
const AuthorizationContentWrapper = styled.div`
	max-width: 360px;
	width: 90%;
	height: 500px;
	padding: 50px;
	background-color: #2a2a2a;
	margin: 25px auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 10px;
`;

const Input = styled.input`
	width: 100%;
	height: 50px;
	background-color: #2a2a2a;
	border: 1px solid #686868;
	border-radius: 3px;
	color: white;
	padding: 0;
	&:focus {
		border: 1px solid white;
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
`;

const Authorization = () => {
	const t = useI18n();
	const dispatch = useAppDispatch();
	const userData = useAppSelector((state) => state.games.userData);
	const [pageView, setPageView] = useState('login');
	const [userError, setUserError] = useState(false);

	const { push } = useRouter();

	async function registerUser(
		userEmail: string,
		userPass: string,
		userName: string
	) {
		/* console.log(userEmail, userPass); */
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
		/* console.log(userEmail, userPass); */

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
				setUserError(true);
			});
	}

	async function sighOut() {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				//console.log("Signed out successfully");
			})
			.catch((error) => {
				console.log(error); // An error happened.
			});
	}

	return (
		<AuthorizationPage>
			<AuthorizationContentWrapper>
				{pageView === 'login' ? (
					<Login
						loginUser={loginUser}
						userError={userError}
						setPageView={setPageView}
					/>
				) : (
					<Registration
						registerUser={registerUser}
						userError={userError}
						setPageView={setPageView}
					/>
				)}
			</AuthorizationContentWrapper>
		</AuthorizationPage>
	);
};

export default Authorization;
