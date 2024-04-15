import { useEffect, useRef, useState } from "react";
import BoxResult from "../../components/box-result/BoxResult";
import BoxTitle from "../../components/box-title/BoxTitle";
import Box from "../../components/box/Box";
import Button from "../../components/button/Button";
import Container from "../../components/container/Container";
import InputText from "../../components/input-text/InputText";
import Navigation from "../../components/navigation/Navigation";
import "./UpdateUsername.css";
import axios from "axios";

const UpdateUsername = () => {
  const [username, setUsername] = useState("");
  const token = useRef("");

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

  useEffect(() => {
    // Get data from token
    const cookies = decodeURIComponent(document.cookie);
    const array = cookies.split("; ");
    array.forEach((element) => {
      const array = element.split("=");
      if (array[0] === "username") {
        setUsername(array[1]);
      } else if (array[0] === "token") {
        token.current = array[1];
      }
    });
  }, []);

  const updateUsername = () => {
    if (username.length < 3 || username.length > 10) {
      updateResult(true, "Username must be between 3 and 10");
    } else {
      // Sending request
      const url = `${process.env.REACT_APP_AUTHENTICATION_URL}/update_username`;
      const body = {
        username,
      };

      axios
        .put(url, body, {
          headers: {
            Authorization: `Bearer ${token.current}`,
          },
        })
        .then((res) => {
          if (res.data.result === "username_is_taken") {
            updateResult(true, "Username is taken");
          } else if (res.data.result === "username_updated") {
            const seven_days = 60 * 60 * 24 * 7;
            document.cookie = `username=${username}; max-age=${seven_days}`;

            updateResult(false, "Username updated");
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
      <Navigation page={"update_username"} />
      <BoxTitle title={"Update Username"} />
      <Box className={"h-200"}>
        <InputText
          text={username}
          setText={setUsername}
          placeholder={"Enter your username"}
        />
        <Button buttonText={"Update Username"} buttonFun={updateUsername} />
        <BoxResult resultContents={resultContents} />
      </Box>
    </Container>
  );
};

export default UpdateUsername;
