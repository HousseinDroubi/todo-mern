import { useState } from "react";
import BoxTitle from "../../components/box-title/BoxTitle";
import Box from "../../components/box/Box";
import Container from "../../components/container/Container";
import InputText from "../../components/input-text/InputText";
import "./SignIn.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BoxResult from "../../components/box-result/BoxResult";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log(process.env.REACT_APP_TODO_URL);

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

  const signIn = () => {
    if (username.length < 3 || username.length > 10) {
      updateResult(true, "Username must be between 3 and 10");
    } else if (password.length < 6 || password.length > 20) {
      updateResult(true, "Password must be between 6 and 20");
    } else {
      const url = `${process.env.REACT_APP_AUTHENTICATION_URL}/sign_in`;
      const body = {
        username: username,
        password: password,
      };
      axios
        .post(url, body)
        .then((response) => {
          if (response.data.result === "username_or_password_are_wrong") {
            updateResult(true, "Username or password are wrong");
          } else if (response.data.result === "done") {
            const seven_days = 60 * 60 * 24 * 7;
            document.cookie = `token=${response.data.token}; max-age=${seven_days}`;
            document.cookie = `username=${username}; max-age=${seven_days}`;

            // Get all todos

            const url = `${process.env.REACT_APP_TODO_URL}`;
            axios
              .get(url, {
                headers: {
                  Authorization: `Bearer ${response.data.token}`,
                },
              })
              .then((res) => {
                if (res.data.result === "done") {
                  localStorage.setItem("todos", JSON.stringify(res.data.todos));
                  setUsername("");
                  setPassword("");
                  navigate("/all-todos");
                } else {
                  updateResult(true, "Something went wrong");
                }
              })
              .catch(() => {
                updateResult(true, "Something went wrong");
              });
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
      <BoxTitle title="Sign in" />
      <Box className={"h-400"}>
        <InputText
          placeholder={"Enter your username"}
          text={username}
          setText={setUsername}
        />
        <InputText
          placeholder={"Enter your password"}
          isPassword
          text={password}
          setText={setPassword}
        />
        <a
          onClick={() => {
            navigate("/sign-up");
          }}
          className="text-align-end mr-20 w-100 link"
        >
          Create new account
        </a>
        <Button buttonText={"Sign in"} buttonFun={signIn} />
        <BoxResult resultContents={resultContents} />
      </Box>
    </Container>
  );
};

export default SignIn;
