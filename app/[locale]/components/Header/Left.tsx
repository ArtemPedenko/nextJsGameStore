import IconWrapper from "../IconWrapper";
import SiteLogo from "@/images/SiteLogo";
import HeaderButton from "./HeaderButton";
import Divider from "../Divider";
import styled from "styled-components";
import { useI18n } from "@/locales/client";

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export default function Left() {
  const t = useI18n();

  return (
    <>
      <IconWrapper
        icon={<SiteLogo />}
        height="100%"
        width="50px"
        margin="0 10px"
      />
      <HeaderLeft>
        <HeaderButton href="/">{t(`store`)}</HeaderButton>
        <HeaderButton href="/indeveloping">{t(`distribution`)}</HeaderButton>
        <HeaderButton href="/indeveloping">{t(`support`)}</HeaderButton>
        <Divider />
        <HeaderButton href="https://www.unrealengine.com/en-US">
          UNREAL ENGINE
        </HeaderButton>
      </HeaderLeft>
    </>
  );
}
