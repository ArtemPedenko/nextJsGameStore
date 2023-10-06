import styled from "styled-components";
import { FC } from "react";
import Link from "next/link";

const Button = styled.button`
  border: none;
  background-color: #121212;
  font-size: 14px;
  color: #b8b8b8;
  padding: 0 10px;
  outline: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  font-family: OpenSans, sans-serif, arial;
  letter-spacing: 0.075em;
  &:hover {
    cursor: pointer;
    color: #ffffff;
  }
`;

interface HeaderButtonProps {
    children: string;
    href: string;
}

const HeaderStickyButton: FC<HeaderButtonProps> = ({ children, href }) => {
    return (
        <Link href={href}>
            <Button>{children}</Button>
        </Link>
    );
};

export default HeaderStickyButton;