"use client";

import styled from "styled-components";
import { FC, useEffect, useState, useRef } from "react";
import { useI18n } from "@/locales/client";

interface ModuleBreakerProps {
  data: any;
}

const ModuleBreaker: FC<ModuleBreakerProps> = ({ data }) => {
  const t = useI18n();
  console.log(data.modules);
  return <></>;
};

export default ModuleBreaker;
