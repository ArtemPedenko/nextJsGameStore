import styled from "styled-components";
import { FC } from "react";
import Link from "next/link";

const Button = styled.button`
  height: 100%;
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
  children: any;
  href?: string;
  onClick?: React.InputHTMLAttributes<HTMLButtonElement>["onClick"];
}

const HeaderStickyButton: FC<HeaderButtonProps> = ({
  children,
  href,
  onClick,
}) => {
  if (href) {
    return (
      <Link href={href} style={{ height: "100%" }}>
        <Button onClick={onClick}>{children}</Button>
      </Link>
    );
  } else {
    return <Button onClick={onClick}>{children}</Button>;
  }
};

export default HeaderStickyButton;
