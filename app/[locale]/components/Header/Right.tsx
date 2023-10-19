import styled from "styled-components";
import { useState, useRef } from "react";
import IconWrapper from "../IconWrapper";
import LanguageLogo from "@/images/LanguageLogo";
import HeaderButton from "./HeaderButton";
import ProfileLogo from "@/images/ProfileLogo";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";
import { setUserData } from "@/app/store/slice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useI18n } from "@/locales/client";
import CloseLogo from "@/images/CloseLogo";
import MobileMenuLogo from "@/images/MobileMenuLogo";
import LanguageModal from "./Right/LanguageModal";
import MobileMenu from "./Right/MobileMenu";

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

export default function Right() {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const t = useI18n();

  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobiLanguageMenu, setMobileLanguageMenu] = useState(false);
  const [mobileUserMenu, setMobileUserMenu] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userData = useAppSelector((state) => state.games.userData);

  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);
  const myRef = useRef(null);

  const menuSwitcher = () => {
    if (mobileMenuOpen || mobiLanguageMenu || mobileUserMenu) {
      setMobileMenuOpen(false);
      setMobileLanguageMenu(false);
      setMobileUserMenu(false);
    } else {
      setMobileMenuOpen(true);
    }
  };

  async function sighOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        //console.log('Signed out successfully');
        dispatch(setUserData(""));
        setMobileMenuOpen(false);
        setMobileLanguageMenu(false);
        setMobileUserMenu(false);
        push("./");
      })
      .catch((error) => {
        console.log(error); // An error happened.
      });
  }

  return (
    <>
      <HeaderRight>
        <div
          style={{
            height: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
          onMouseEnter={() => modalOpen()}
          onMouseLeave={() => modalClose()}
          ref={myRef}
          id="modalParent"
        >
          <IconWrapper
            icon={<LanguageLogo />}
            height="30px"
            width="30px"
            margin="0"
          />
        </div>
        <IconWrapper
          icon={<ProfileLogo />}
          height="30px"
          width="30px"
          margin="0"
        />
        {userData ? (
          <UserName
            onMouseEnter={() => setUserMenuOpen(true)}
            onMouseLeave={() => setUserMenuOpen(false)}
          >
            {userData.displayName}
            {userMenuOpen ? (
              <UserMenu>
                <Link href={"/cart"}>
                  <UserMenuButton>{t(`game_wallet`)}</UserMenuButton>
                </Link>
                <Link href={"/wishlist"}>
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
          <HeaderButton href="/authorization">{t(`sign_in`)}</HeaderButton>
        )}
      </HeaderRight>
      <MobileMenuButton onClick={() => menuSwitcher()}>
        <IconWrapper
          icon={mobileMenuOpen ? <CloseLogo /> : <MobileMenuLogo />}
          height="100%"
          width="50px"
        />
      </MobileMenuButton>
      {mobileMenuOpen ? <MobileMenu signOut={sighOut} /> : null}
      <LanguageModal
        isOpen={open}
        close={modalClose}
        open={modalOpen}
        parentRef={myRef}
      />
    </>
  );
}
