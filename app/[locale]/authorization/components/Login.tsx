"use client";

import { FC, MouseEventHandler } from "react";
import SiteLogo from "@/images/SiteLogo";
import IconWrapper from "../../components/IconWrapper";
import styled from "styled-components";
import { useI18n } from "@/locales/client";
import Button from "../../components/Button";
import { auth } from "../../../firebase/firebase";
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

interface LoginProps {
  loginUser: Function;
  setPageView: Function;
  userError: boolean;
}

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

const Login: FC<LoginProps> = ({ loginUser, setPageView, userError }) => {
  return (
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
                Войти
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
  );
};

export default Login;
