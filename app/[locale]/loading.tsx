"use client";

import styled from "styled-components";

const SpeenWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpeenWheel = styled.div`
  border: 8px solid black;
  border-radius: 50%;
  border-top: 8px solid #f3f3f3;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <SpeenWrapper>
      <SpeenWheel />
    </SpeenWrapper>
  );
}
