"use client";

import styled from "styled-components";
import { FC } from "react";

interface StyledButtonProps {
  contained?: any;
}

const StyledButton = styled.button<StyledButtonProps>((props) => ({
  border: props.contained ? "none" : "1px solid #ffffff",
  borderRadius: "4px",
  height: "50px",
  width: "100%",
  background: props.contained ? "#ffffff" : "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#ffffff", // or other color,
    opacity: "0.9",
  },
}));

interface ButtonProps {
  children: string;
  contained?: any;
}

const Button: FC<ButtonProps> = ({ children, contained }) => {
  return <StyledButton contained={contained}>{children}</StyledButton>;
};

export default Button;
