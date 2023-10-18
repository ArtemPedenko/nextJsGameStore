import { FC } from "react";
import styled from "styled-components";
import { useI18n } from "@/locales/client";

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

const MobileUserMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
`;

const MobileLanguageMenuItem = styled.div`
  height: 35px;
  width: 100%;
  border-top: 1px solid #8e8e8e;
  border-bottom: 1px solid #8e8e8e;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface MobileMenuProps {
  setMobileUserMenu: Function;
  userData: {
    displayName: string;
  };
  signOut: Function;
}

const MobileMenuUser: FC<MobileMenuProps> = ({
  setMobileUserMenu,
  userData,
  signOut,
}) => {
  const t = useI18n();
  return (
    <MobileMenuWrapper>
      <MobileUserMenu>
        <MobileLanguageMenuItem onClick={() => setMobileUserMenu(false)}>
          {userData.displayName}
        </MobileLanguageMenuItem>
        <MobileLanguageMenuItem>{t(`game_wallet`)}</MobileLanguageMenuItem>
        <MobileLanguageMenuItem>{t(`wishlist`)}</MobileLanguageMenuItem>
        <MobileLanguageMenuItem onClick={() => signOut()}>
          {t(`logout`)}
        </MobileLanguageMenuItem>
      </MobileUserMenu>
    </MobileMenuWrapper>
  );
};

export default MobileMenuUser;
