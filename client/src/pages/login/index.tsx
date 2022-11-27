/* PAGE: LOGIN
   ========================================================================== */

import { login, register } from "api/post/post.api";

import ROUTES from "routes/constant";
import { setToLocalStorage } from "utils/functions";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Styled from "./index.style";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    try {
      const response = await login({
        username: "admin",
        password: "admin",
      });
      const tokens = JSON.stringify(response.data);
      setToLocalStorage("tokens", tokens);
      navigate(ROUTES.home);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [navigate]);

  const handleRegister = useCallback(async () => {
    try {
      await register({
        username: "admin",
        password: "admin",
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);

  return (
    <Styled.LoginContainer>
      <p>Login page</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Sign up</button>
    </Styled.LoginContainer>
  );
};

export default Login;
