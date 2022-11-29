/* PAGE: LOGIN
   ========================================================================== */

import { login, register } from "api/post/post.api";

import ROUTES from "routes/constant";
import { setToLocalStorage } from "utils/functions";
import { useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Styled from "./index.style";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff, AccountCircle } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { t } = useTranslation();

  const schema = useMemo(() => {
    const messUsername = t("login.username_not_empty");
    const messPassword = t("login.password_not_empty");
    const messConfirm = t("login.password_must_match");
    return yup
      .object({
        username: yup.string().required(messUsername),
        password: yup.string().required(messPassword),
        confirm_password: isSignUp
          ? yup.string().oneOf([yup.ref("password"), null], messConfirm)
          : yup.string(),
      })
      .required();
  }, [isSignUp, t]);

  const method = useForm({
    resolver: yupResolver(schema),
  });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleLogin = useCallback(async () => {
    try {
      const response = await login({
        username: method.getValues("username"),
        password: method.getValues("password"),
      });
      const tokens = JSON.stringify(response.data);
      setToLocalStorage("tokens", tokens);
      navigate(ROUTES.home);
      setErrorMessage("");
    } catch (error: { code: number; message: string } | any) {
      // eslint-disable-next-line no-console
      setErrorMessage(error?.message);
    }
  }, [method, navigate]);

  const handleRegister = useCallback(async () => {
    try {
      const result = await register({
        username: method.getValues("username"),
        password: method.getValues("password"),
      });
      setErrorMessage(result?.data?.status.toString());
    } catch (error: { code: number; message: string } | any) {
      // eslint-disable-next-line no-console
      setErrorMessage(error?.message);
    }
  }, [method]);

  return (
    <Styled.LoginContainer>
      <Styled.Title>
        {isSignUp ? t("login.sign_up") : t("login.login")}
      </Styled.Title>
      <FormProvider {...method}>
        <Styled.FormContainer
          onSubmit={
            isSignUp
              ? method.handleSubmit(handleRegister)
              : method.handleSubmit(handleLogin)
          }
        >
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              {t("login.username")}
            </InputLabel>
            <OutlinedInput
              {...method.register("username", { required: true })}
              onChange={(e) => method.setValue("username", e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              }
              label={t("login.username")}
            />
          </FormControl>
          {method.formState.errors.username && (
            <Styled.Errors>
              {method.formState.errors.username.message}
            </Styled.Errors>
          )}
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              {t("login.password")}
            </InputLabel>
            <OutlinedInput
              type={type ? "text" : "password"}
              {...method.register("password", { required: true })}
              onChange={(e) => method.setValue("password", e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setType((prev) => !prev)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {type ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={t("login.password")}
            />
          </FormControl>
          {method.formState.errors.password && (
            <Styled.Errors>
              {method.formState.errors.password.message}
            </Styled.Errors>
          )}
          {isSignUp && (
            <>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  {t("login.confirm_password")}
                </InputLabel>
                <OutlinedInput
                  {...method.register("confirm_password", {
                    required: isSignUp,
                  })}
                  type={type ? "text" : "password"}
                  onChange={(e) =>
                    method.setValue("confirm_password", e.target.value)
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setType((prev) => !prev)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {type ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label={t("login.confirm_password")}
                />
              </FormControl>
              {method.formState.errors.confirm_password && (
                <Styled.Errors>
                  {method.formState.errors.confirm_password.message}
                </Styled.Errors>
              )}
            </>
          )}
          {isSignUp ? (
            <>
              <Styled.LoginButton
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignUp(false);
                }}
              >
                {t("login.back")}
              </Styled.LoginButton>
              <Styled.SignUpButton type="submit">
                {t("login.sign_up")}
              </Styled.SignUpButton>
            </>
          ) : (
            <>
              <Styled.LoginButton type="submit">
                {t("login.login")}
              </Styled.LoginButton>
              <Styled.SignUpButton
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignUp(true);
                }}
              >
                {t("login.sign_up")}
              </Styled.SignUpButton>
            </>
          )}
          {errorMessage && <Styled.Errors>{errorMessage}</Styled.Errors>}
        </Styled.FormContainer>
      </FormProvider>
    </Styled.LoginContainer>
  );
};

export default Login;
