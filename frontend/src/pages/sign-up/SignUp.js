import BoxTitle from "../../components/box-title/BoxTitle";
import "./SignUp.css";
import Box from "../../components/box/Box";
import InputText from "../../components/input-text/InputText";
import Button from "../../components/button/Button";
import BoxResult from "../../components/box-result/BoxResult";
import Container from "../../components/container/Container";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [resultContents, setResultContents] = useState({
    isError: false,
    text: "",
  });

  const updateResult = (isError, text) => {
    setResultContents({
      isError,
      text,
    });
  };

  const signUp = () => {
    if (username.length < 3 || username.length > 10) {
      updateResult(true, "Username must be between 3 and 10");
    } else if (password.length < 6 || password.length > 20) {
      updateResult(true, "Password must be between 6 and 20");
    } else if (rePassword.length < 6 || rePassword.length > 20) {
      updateResult(true, "Reset password must be between 6 and 20");
    } else if (password !== rePassword) {
      updateResult(true, "Password and reset password don't match");
    } else {
      const url = `${process.env.REACT_APP_AUTHENTICATION_URL}/sign_up`;
      const body = {
        username: username,
        password: password,
      };
      axios
        .post(url, body)
        .then((response) => {
          if (response.data.result === "user_has_been_created_successfully") {
            updateResult(false, "Account created, please sign in");
            setUsername("");
            setPassword("");
            setRePassword("");
          } else if (response.data.result === "username_is_taken") {
            updateResult(true, "Username is taken");
          } else {
            updateResult(true, "Something went wrong");
          }
        })
        .catch(() => {
          updateResult(true, "Something went wrong");
        });
    }
  };

  return (
    <Container>
      <BoxTitle title="Sign Up" />
      <Box className={"h-500"}>
        <InputText
          placeholder={"Enter your username"}
          text={username}
          setText={setUsername}
        />
        <InputText
          isPassword
          placeholder={"Enter your password"}
          text={password}
          setText={setPassword}
        />
        <InputText
          isPassword
          placeholder={"Re-enter your password"}
          text={rePassword}
          setText={setRePassword}
        />
        <Button buttonText={"Sign up"} buttonFun={signUp} />
        <BoxResult resultContents={resultContents} />
      </Box>
    </Container>
  );
};

export default SignUp;
