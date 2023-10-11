'use client';

import Slider from '../components/Slider';
import SiteLogo from '@/images/SiteLogo';
import IconWrapper from '../components/IconWrapper';
import styled from 'styled-components';
import { useI18n } from '@/locales/client';
import Button from '../components/Button';
import { auth } from '../../firebase/firebase';
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

const EmailInput = styled.input`
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

const PasswordInput = styled.input`
	width: 100%;
	height: 50px;
	background-color: #2a2a2a;
	border: 1px solid #686868;
	border-radius: 3px;
	color: white;
	padding: 0;
`;

const Authorization = () => {
	const t = useI18n();
	const dispatch = useAppDispatch();
	const userData = useAppSelector((state) => state.games.userData);
	const [userEmail, setUserEmail] = useState('');
	const [userPass, setUserPass] = useState('');
	const [userName, setUserName] = useState('');

	const { push } = useRouter();

	async function registerUser() {
		console.log(userEmail, userPass);
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

	async function loginUser() {
		console.log(userEmail, userPass);

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

	return (
		<AuthorizationPage>
			<AuthorizationContentWrapper>
				<IconWrapper
					icon={<SiteLogo />}
					height='100px'
					width='100px'
					margin='0 10px'
				/>
				<EmailInput
					placeholder={'Введите отображаемое имя'}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<EmailInput
					placeholder={t(`enter_email`)}
					onChange={(e) => setUserEmail(e.target.value)}
				/>
				<PasswordInput
					placeholder={t(`enter_password`)}
					onChange={(e) => setUserPass(e.target.value)}
				/>
				<Button onClick={registerUser}>{t(`enter_now`)}</Button>
				<Button onClick={loginUser}>Войти</Button>
				<Button onClick={sighOut}>Выйти</Button>
			</AuthorizationContentWrapper>
		</AuthorizationPage>
	);
};

export default Authorization;
