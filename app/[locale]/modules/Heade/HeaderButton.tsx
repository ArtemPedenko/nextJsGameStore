import Link from 'next/link'
import styled from "styled-components";
import { FC } from "react";

const Button = styled.button`
  border: none;
  background-color: #2a2a2a;
  font-size: 10.5px;
  color: #b8b8b8;
  padding: 0 1em;
  outline: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  height: 100%;
  font-family: OpenSans, sans-serif, arial;
  letter-spacing: 0.075em;
  &:hover {
    cursor: pointer;
    color: #ffffff;
  }
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 0.3rem;
    background: #2a2a2a;
    left: 0;
    bottom: 0;
    transform: translateY(3px);
    transition: 0.3s ease-out;
  }
  &:hover::after {
    transform: scale(1, 1);
    background-color: #0078f2;
  }
`;

interface HeaderButtonProps {
  children: string;
  href: string;
}

const HeaderButton: FC<HeaderButtonProps> = ({ children, href }) => {
  return (
    <Link style={{ height: "100%" }} href={href}>
      <Button>{children}</Button>
    </Link>
  );
};

export default HeaderButton;
//