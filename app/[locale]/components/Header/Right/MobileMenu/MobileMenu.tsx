import { FC, useState } from "react";
import styled from "styled-components";
import HeaderButton from "../../HeaderButton";
import IconWrapper from "../../../IconWrapper";
import LanguageLogo from "@/images/LanguageLogo";
import Divider from "../../../Divider";
import ProfileLogo from "@/images/ProfileLogo";
import { useAppSelector } from "@/app/store/hooks";
import { useI18n, useCurrentLocale, useChangeLocale } from "@/locales/client";
import MobileMenuLanguage from "./MobileMenuLanguage";
import MobileMenuUser from "./MobileMenuUser";

const MobileMenuWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 0px;
  width: 80vw;
  background-color: #2a2a2a;
  height: 90vh;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
`;

const MobileMenuTop = styled.div`
  display: flex;
  flex-direction: column;
  height: 180px;
  margin: 0 0 0 10px;
`;

const MobileMenuBottom = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  align-items: center;
`;
const MobileMenuBottomLeft = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileMenuBottomRight = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface MobileMenuProps {
  signOut: Function;
}

const MobileMenu: FC<MobileMenuProps> = ({ signOut }) => {
  const userData = useAppSelector((state) => state.games.userData);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobiLanguageMenu, setMobileLanguageMenu] = useState(false);
  const [mobileUserMenu, setMobileUserMenu] = useState(false);
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();
  const t = useI18n();

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
  return (
    <>
      <MobileMenuWrapper>
        <MobileMenuTop>
          <HeaderButton href="/">{t(`store`)}</HeaderButton>
          <HeaderButton href="/">{t(`distribution`)}</HeaderButton>
          <HeaderButton href="/">{t(`support`)}</HeaderButton>
          <HeaderButton href="https://www.unrealengine.com/en-US">
            UNREAL ENGINE
          </HeaderButton>
        </MobileMenuTop>
        <MobileMenuBottom>
          <MobileMenuBottomLeft onClick={() => mobiLanguageMenuSwithcer()}>
            <IconWrapper
              icon={<LanguageLogo />}
              height="30px"
              width="30px"
              margin="0"
            />
          </MobileMenuBottomLeft>
          <Divider />
          <MobileMenuBottomRight>
            {userData ? (
              <div onClick={() => setMobileUserMenu(true)}>
                {userData.displayName}
              </div>
            ) : (
              <>
                <IconWrapper
                  icon={<ProfileLogo />}
                  height="30px"
                  width="30px"
                  margin="0"
                />
                <HeaderButton
                  href="./authorization"
                  onClick={() => menuSwitcher()}
                >
                  {t(`sign_in`)}
                </HeaderButton>
              </>
            )}
          </MobileMenuBottomRight>
        </MobileMenuBottom>
      </MobileMenuWrapper>
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
          signOut={signOut}
        />
      ) : null}
    </>
  );
};

export default MobileMenu;
