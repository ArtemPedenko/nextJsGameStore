'use client';

import React from 'react';
import SiteLogo from '@/images/SiteLogo';
import LanguageLogo from '@/images/LanguageLogo';
import ProfileLogo from '@/images/ProfileLogo';
import CloseLogo from '@/images/CloseLogo';
import MobileMenuLogo from '@/images/MobileMenuLogo';
import IconWrapper from './IconWrapper';
import Divider from './Divider';
import styled from 'styled-components';
import LanguageModal from './Header/LanguageModal';
import { useState, useRef, useEffect } from 'react';
import HeaderButton from './Header/HeaderButton';
import {
	useI18n,
	useCurrentLocale,
	useChangeLocale,
} from '../../../locales/client';
import MobileMenu from './Header/MobileMenu/MobileMenu';
import MobileMenuLanguage from './Header/MobileMenu/MobileMenuLanguage';
import { auth } from '@/app/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { setUserData } from '@/app/store/slice';
import MobileMenuUser from './Header/MobileMenu/MobileMenuUser';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const HeaderWrapper = styled.div`
	width: 100%;
	height: 50px;
	background-color: #2a2a2a;
	display: flex;
	align-items: center;
	position: relative;
`;
const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
	height: 50px;
	@media (max-width: 768px) {
		display: none;
	}
`;

const HeaderRight = styled.div`
	display: flex;
	align-items: center;
	height: 50px;
	gap: 10px;
	margin: 0 0 0 auto;
	@media (max-width: 768px) {
		display: none;
	}
`;

const MobileMenuButton = styled.div`
	display: none;
	@media (max-width: 768px) {
		display: block;
		width: 50px;
		height: 50px;
		background-color: #0078f2;
		margin: 0 0 0 auto;
	}
`;

const UserName = styled.div`
	position: relative;
	height: 100%;
	display: flex;
	align-items: center;
`;

const UserMenu = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
	padding: 10px 0;
	top: 100%;
	background-color: #2a2a2a;
	z-index: 12;
`;

const UserMenuButton = styled.button`
	width: 100%;
	height: 30px;
	background-color: #2a2a2a;
	color: #b8b8b8;
	text-decoration: none;
	border: none;
	&:hover {
		cursor: pointer;
		color: #ffffff;
	}
`;

export default function Header() {
	const dispatch = useAppDispatch();
	const t = useI18n();
	const { push } = useRouter();
	const currentLocale = useCurrentLocale();
	const changeLocale = useChangeLocale();
	const userData = useAppSelector((state) => state.games.userData);

	const [open, setOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [mobiLanguageMenu, setMobileLanguageMenu] = useState(false);
	const [mobileUserMenu, setMobileUserMenu] = useState(false);
	const [userMenuOpen, setUserMenuOpen] = useState(false);

	async function sighOut() {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				//console.log('Signed out successfully');
				dispatch(setUserData(''));
				setMobileMenuOpen(false);
				setMobileLanguageMenu(false);
				setMobileUserMenu(false);
				push('./');
			})
			.catch((error) => {
				console.log(error); // An error happened.
			});
	}

	const mobiLanguageMenuSwithcer = () =>
		setMobileLanguageMenu(!mobiLanguageMenu);

	const menuSwitcher = () => {
		if (mobileMenuOpen || mobiLanguageMenu || mobileUserMenu) {
			setMobileMenuOpen(false);
			setMobileLanguageMenu(false);
			setMobileUserMenu(false);
		} else {
			setMobileMenuOpen(true);
		}
	};
	const modalOpen = () => setOpen(true);
	const modalClose = () => setOpen(false);
	const myRef = useRef(null);

	useEffect(() => {
		auth.onAuthStateChanged(function (user) {
			const userJson = user?.toJSON();
			if (user) {
				dispatch(setUserData(userJson));
				console.log('я в сети');
				// User is signed in.
			}
		});
	}, []);

	return (
		<>
			<HeaderWrapper>
				<>
					<IconWrapper
						icon={<SiteLogo />}
						height='100%'
						width='50px'
						margin='0 10px'
					/>
					<HeaderLeft>
						<HeaderButton href='/'>{t(`store`)}</HeaderButton>
						<HeaderButton href='/'>{t(`distribution`)}</HeaderButton>
						<HeaderButton href='/'>{t(`support`)}</HeaderButton>
						<Divider />
						<HeaderButton href='https://www.unrealengine.com/en-US'>
							UNREAL ENGINE
						</HeaderButton>
					</HeaderLeft>
				</>
				<HeaderRight>
					<div
						style={{
							height: '100%',
							alignItems: 'center',
							display: 'flex',
							justifyContent: 'center',
						}}
						onMouseEnter={() => modalOpen()}
						onMouseLeave={() => modalClose()}
						ref={myRef}
						id='modalParent'
					>
						<IconWrapper
							icon={<LanguageLogo />}
							height='30px'
							width='30px'
							margin='0'
						/>
					</div>
					<IconWrapper
						icon={<ProfileLogo />}
						height='30px'
						width='30px'
						margin='0'
					/>
					{userData ? (
						<UserName
							onMouseEnter={() => setUserMenuOpen(true)}
							onMouseLeave={() => setUserMenuOpen(false)}
						>
							{userData.displayName}
							{userMenuOpen ? (
								<UserMenu>
									<UserMenuButton>{t(`game_wallet`)}</UserMenuButton>
									<Link href={'/wishlist'}>
										<UserMenuButton>{t(`wishlist`)}</UserMenuButton>
									</Link>
									<UserMenuButton onClick={() => sighOut()}>
										{t(`logout`)}
									</UserMenuButton>
								</UserMenu>
							) : (
								<></>
							)}
						</UserName>
					) : (
						<HeaderButton href='/authorization'>{t(`sign_in`)}</HeaderButton>
					)}
				</HeaderRight>
				<MobileMenuButton onClick={() => menuSwitcher()}>
					<IconWrapper
						icon={mobileMenuOpen ? <CloseLogo /> : <MobileMenuLogo />}
						height='100%'
						width='50px'
					/>
				</MobileMenuButton>
			</HeaderWrapper>
			{mobileMenuOpen ? (
				<MobileMenu
					mobiLanguageMenuSwithcer={mobiLanguageMenuSwithcer}
					userData={userData}
					setMobileUserMenu={setMobileUserMenu}
					menuSwitcher={menuSwitcher}
				/>
			) : null}
			{mobiLanguageMenu ? (
				<MobileMenuLanguage
					mobiLanguageMenuSwithcer={mobiLanguageMenuSwithcer}
					currentLocale={currentLocale}
					changeLocale={changeLocale}
				/>
			) : null}

			{mobileUserMenu ? (
				<MobileMenuUser
					userData={userData}
					setMobileUserMenu={setMobileUserMenu}
					sighOut={sighOut}
				/>
			) : null}
			<LanguageModal
				isOpen={open}
				close={modalClose}
				open={modalOpen}
				parentRef={myRef}
			/>
		</>
	);
}
