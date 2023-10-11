"use client";

import Slider from "../components/Slider";
import SiteLogo from "@/images/SiteLogo";
import IconWrapper from "../components/IconWrapper";
import styled from "styled-components";
import { useI18n } from "@/locales/client";
import Button from "../components/Button";

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

  async function getData(url: string) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }
  return (
    <AuthorizationPage>
      <AuthorizationContentWrapper>
        <IconWrapper
          icon={<SiteLogo />}
          height="100px"
          width="100px"
          margin="0 10px"
        />
        <EmailInput placeholder={t(`enter_email`)} />
        <PasswordInput placeholder={t(`enter_password`)} />
        <Button>{t(`enter_now`)}</Button>
      </AuthorizationContentWrapper>
    </AuthorizationPage>
  );
};

export default Authorization;
