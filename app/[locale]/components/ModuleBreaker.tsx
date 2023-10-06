// @ts-nocheck
"use client";

import styled from "styled-components";
import { FC, useEffect, useState, useRef } from "react";
import { useI18n } from "@/locales/client";
import { v4 as uuid } from "uuid";

const Wrapper = styled.div`
  width: 1427px;
  height: 450px;
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
  return (
    <Wrapper>
      {data.modules.map((item, index) => {
        return (
          <div
            key={uuid()}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
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
            {item.title}
          </div>
        );
      })}
    </Wrapper>
  );
};

export default ModuleBreaker;
