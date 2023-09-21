"use client";

import styled from "styled-components";
import { FC, useEffect, useState, useRef } from "react";
import { useI18n } from "@/locales/client";

const Wrapper = styled.div`
  width: 1427px;
  height: 550px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  justify-content: space-between;
`;

interface ModuleBreakerProps {
  data: any;
}

const ModuleBreaker: FC<ModuleBreakerProps> = ({ data }) => {
  const t = useI18n();
  console.log(data.modules);
  return (
    <Wrapper>
      {data.modules.map((item, index) => {
        return (
          <img
            alt=""
            src={item.image.src}
            style={{
              height: "350px",
              width: `${
                (1427 - data.modules.length * 20) / data.modules.length + "px"
              }`,
              objectFit: "cover",
            }}
          />
        );
      })}
    </Wrapper>
  );
};

export default ModuleBreaker;
