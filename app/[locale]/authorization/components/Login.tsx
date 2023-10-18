"use client";

import { FC } from "react";
import SiteLogo from "@/images/SiteLogo";
import IconWrapper from "../../components/IconWrapper";
import styled from "styled-components";
import { useI18n } from "@/locales/client";
import Button from "../../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";

interface LoginProps {
  loginUser: Function;
  setPageView: Function;
  userError: boolean;
  setUserError: Function;
  setRegisterError: Function;
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

const Login: FC<LoginProps> = ({
  loginUser,
  setPageView,
  userError,
  setUserError,
  setRegisterError,
}) => {
  const t = useI18n();

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
                placeholder={t(`enter_email`)}
                type="text"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email ? (
                <div style={{ color: "red" }}>{errors.email}</div>
              ) : null}

              <Input
                id="password"
                placeholder={t(`enter_password`)}
                type="password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password ? (
                <div style={{ color: "red" }}>{errors.password}</div>
              ) : null}

              <Button type="submit" onClick={() => null}>
                {t(`sign_in`)}
              </Button>
            </Form>
          );
        }}
      </Formik>
      {userError ? (
        <div style={{ color: "red" }}>{t(`wrong_email_password`)}</div>
      ) : null}
      {
        <>
          <div>{t(`dont_have_account`)}</div>
          <div
            onClick={() => {
              setPageView("registration");
              setUserError(false);
              setRegisterError("");
            }}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {t(`sign_up`)}
          </div>
        </>
      }
    </>
  );
};

export default Login;
