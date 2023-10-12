"use client";

import styled from "styled-components";
import { FC, MouseEventHandler } from "react";

interface StyledButtonProps {
  $contained?: any;
}

const StyledButton = styled.button<StyledButtonProps>((props) => ({
  border: props.$contained ? "none" : "1px solid #ffffff",
  borderRadius: "4px",
  height: "50px",
  width: "100%",
  background: props.$contained ? "#ffffff" : "none",
  color: props.$contained ? "black" : "white",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#ffffff",
    opacity: "0.9",
    color: "black",
  },
}));

interface ButtonProps {
  children: string;
  $contained?: any;
  onClick?: MouseEventHandler<HTMLButtonElement> | Function;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: FC<ButtonProps> = ({ children, $contained, onClick, type }) => {
  return (
    <StyledButton onClick={() => onClick()} $contained={$contained} type={type}>
      {children}
    </StyledButton>
  );
};

export default Button;
