"use client";

import styled from "styled-components";
import { auth } from "@/app/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setUserData } from "@/app/store/slice";
import { useRouter } from "next/navigation";
import Login from "./components/Login";
import Registration from "./components/Registration";

const AuthorizationPage = styled.div`
  position: absolute;
  top: 50px;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 12;
`;
const AuthorizationContentWrapper = styled.div`
  max-width: 360px;
  width: 90%;
  height: 500px;
  padding: 50px;
  background-color: #2a2a2a;
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Authorization = ({ params }: { params: { locale: string } }) => {
  console.log(params);
  const dispatch = useAppDispatch();
  const [pageView, setPageView] = useState("login");
  const [userError, setUserError] = useState(false);
  const [registrError, setRegisterError] = useState("");

  const { push } = useRouter();

  async function registerUser(
    userEmail: string,
    userPass: string,
    userName: string
  ) {
    /* console.log(userEmail, userPass); */
    await createUserWithEmailAndPassword(auth, userEmail, userPass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(setUserData(user));
        // ...
      })
      .then(() => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: userName,
          });
        }
        push("./");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        if (errorCode == "auth/email-already-in-use") {
          if (params.locale === "ru") {
            setRegisterError("Этот email уже используется");
          } else {
            setRegisterError("This email already in use");
          }
        }
        // ..
      });
  }

  async function loginUser(userEmail: string, userPass: string) {
    /* console.log(userEmail, userPass); */

    signInWithEmailAndPassword(auth, userEmail, userPass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(setUserData(user));
        push("./");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setUserError(true);
      });
  }

  async function sighOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        //console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error); // An error happened.
      });
  }

  return (
    <AuthorizationPage>
      <AuthorizationContentWrapper>
        {pageView === "login" ? (
          <Login
            loginUser={loginUser}
            userError={userError}
            setUserError={setUserError}
            setPageView={setPageView}
            setRegisterError={setRegisterError}
          />
        ) : (
          <Registration
            registerUser={registerUser}
            userError={userError}
            setPageView={setPageView}
            setUserError={setUserError}
            registrError={registrError}
          />
        )}
      </AuthorizationContentWrapper>
    </AuthorizationPage>
  );
};

export default Authorization;
