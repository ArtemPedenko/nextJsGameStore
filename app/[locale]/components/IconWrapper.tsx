"use client";

import { FC } from "react";

interface IconWrapperProps {
  height?: string;
  width?: string;
  margin?: string;
  padding?: string;
  icon?: JSX.Element;
}

const IconWrapper: FC<IconWrapperProps> = ({
  height,
  width,
  icon,
  margin,
  padding,
}) => {
  return <div style={{ height, width, margin, padding }}>{icon}</div>;
};

export default IconWrapper;
