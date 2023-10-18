"use client";

import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { auth } from "@/app/firebase/firebase";
import { useAppDispatch } from "@/app/store/hooks";
import { setUserData } from "@/app/store/slice";
import Right from "./Header/Right";
import Left from "./Header/Left";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: #2a2a2a;
  display: flex;
  align-items: center;
  position: relative;
`;

export default function Header() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      const userJson = user?.toJSON();
      if (user) {
        dispatch(setUserData(userJson));
        console.log("я в сети");
        // User is signed in.
      }
    });
  }, []);

  return (
    <>
      <HeaderWrapper>
        <Left />
        <Right />
      </HeaderWrapper>
    </>
  );
}
