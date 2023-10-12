"use client";

import Slider from "../components/Slider";
import SiteLogo from "@/images/SiteLogo";
import IconWrapper from "../components/IconWrapper";
import styled from "styled-components";
import { useI18n } from "@/locales/client";
import Button from "../components/Button";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setUserData } from "@/app/store/slice";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import * as Yup from "yup";

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

const Input = styled.input`
  width: 100%;
  height: 50px;
  background-color: #2a2a2a;
  border: 1px solid #686868;
  border-radius: 3px;
  color: white;
  padding: 0;
  &:focus {
    border: 1px solid white;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Authorization = () => {
  const t = useI18n();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.games.userData);
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userName, setUserName] = useState("");
  const [pageView, setPageView] = useState("login");
  const [userError, setUserError] = useState(false);

  const { push } = useRouter();

  async function registerUser(
    userEmail: string,
    userPass: string,
    userName: string
  ) {
    console.log(userEmail, userPass);
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
        console.log(errorCode, errorMessage);
        // ..
      });
  }

  async function loginUser(userEmail: string, userPass: string) {
    console.log(userEmail, userPass);

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
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error); // An error happened.
      });
  }

  return (
    <AuthorizationPage>
      <AuthorizationContentWrapper>
        {pageView === "login" ? (
          <>
            <IconWrapper
              icon={<SiteLogo />}
              height="100px"
              width="100px"
              margin="0 10px"
            />
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => loginUser(values.email, values.password)}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().required("Обязательное поле"),
                password: Yup.string().min(6).required("Обязательное поле"),
              })}
            >
              {(props) => {
                props.submitCount > 0 && (props.validateOnChange = true);
                const { values, errors, handleChange, handleSubmit } = props;
                return (
                  <Form onSubmit={handleSubmit}>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email ? (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    ) : null}

                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    {errors.password ? (
                      <div style={{ color: "red" }}>{errors.password}</div>
                    ) : null}

                    <Button type="submit" onClick={() => null}>
                      Submit
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            {userError ? <div>Неправильный емаил/пароль</div> : null}
            {
              <>
                <div>Нет акка?</div>
                <div
                  onClick={() => setPageView("registration")}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  зарегестрироваться
                </div>
              </>
            }
          </>
        ) : (
          <>
            <IconWrapper
              icon={<SiteLogo />}
              height="100px"
              width="100px"
              margin="0 10px"
            />
            <Formik
              initialValues={{ email: "", password: "", login: "" }}
              onSubmit={(values) =>
                registerUser(values.email, values.password, values.login)
              }
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().required("Обязательное поле"),
                login: Yup.string().min(6).required("Обязательное поле"),
                password: Yup.string().min(6).required("Обязательное поле"),
              })}
            >
              {(props) => {
                props.submitCount > 0 && (props.validateOnChange = true);
                const { values, errors, handleChange, handleSubmit } = props;
                return (
                  <Form onSubmit={handleSubmit}>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email ? (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    ) : null}
                    <Input
                      id="login"
                      placeholder="Enter your login"
                      type="text"
                      value={values.login}
                      onChange={handleChange}
                    />
                    {errors.login ? (
                      <div style={{ color: "red" }}>{errors.login}</div>
                    ) : null}
                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    {errors.password ? (
                      <div style={{ color: "red" }}>{errors.password}</div>
                    ) : null}

                    <Button type="submit" onClick={() => null}>
                      Submit
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            {userError ? <div>Неправильный емаил/пароль</div> : null}
            {
              <>
                <div>Есть акк?</div>
                <div
                  onClick={() => setPageView("login")}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  войти
                </div>
              </>
            }
          </>
        )}
      </AuthorizationContentWrapper>
    </AuthorizationPage>
  );
};

export default Authorization;
