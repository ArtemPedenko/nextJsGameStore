"use client";


import styled from "styled-components";
import IconWrapper from "../../components/IconWrapper";
import SearchLogo from "@/images/SearchLogo";
import { useI18n } from "@/locales/client";

const SearchContainer = styled.div`
  display: flex;
  background-color: #202020;
  height: 40px;
  width: 230px;
  align-items: center;
  border-radius: 24px;
`;

const Search = styled.input`
  background-color: #202020;
  height: 35px;
  width: 180px;
  color: white;
  outline: none;
  border: 0;
  border-radius: 24px;
  &:focus: {
    background-color: red;
  }
`;

const SearchField = () => {
    const t = useI18n()


    return (
        <SearchContainer>
            <IconWrapper
                icon={<SearchLogo />}
                height="18px"
                width="18px"
                margin="0"
                padding="10px"
            />
            <Search placeholder={t(`search`)}></Search>
        </SearchContainer>
    );
};

export default SearchField;