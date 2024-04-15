import Navigation from "../../components/navigation/Navigation";
import Container from "../../components/container/Container";
import Box from "../../components/box/Box";
import "./UpdatePassword.css";
import BoxTitle from "../../components/box-title/BoxTitle";
import InputText from "../../components/input-text/InputText";
import Button from "../../components/button/Button";
import BoxResult from "../../components/box-result/BoxResult";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");
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

  // On mount only
  useEffect(() => {
    // Get data from token
    const cookies = decodeURIComponent(document.cookie);
    const array = cookies.split("; ");
    array.forEach((element) => {
      const array = element.split("=");
      if (array[0] === "token") {
        token.current = array[1];
      }
    });
  }, []);

  const updatePassword = () => {
    if (oldPassword.length < 6 || oldPassword.length > 20) {
      updateResult(true, "Password must be between 6 and 20");
    } else if (newPassword.length < 6 || newPassword.length > 20) {
      updateResult(true, "New password must be between 6 and 20");
    } else if (resetPassword.length < 6 || resetPassword.length > 20) {
      updateResult(true, "Reset password must be between 6 and 20");
    } else if (newPassword !== resetPassword) {
      updateResult(true, "New password and reset password don't match");
    } else {
      const url = `${process.env.REACT_APP_AUTHENTICATION_URL}/update_password`;
      const body = {
        old_password: oldPassword,
        new_password: newPassword,
      };
      axios
        .put(url, body, {
          headers: {
            Authorization: `Bearer ${token.current}`,
          },
        })
        .then((res) => {
          if (res.data.result === "old_password_is_wrong") {
            updateResult(true, "Old password is wrong");
          } else if (res.data.result === "password_changed") {
            updateResult(false, "Password changed");
            setOldPassword("");
            setNewPassword("");
            setResetPassword("");
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
      <Navigation page={"update_password"} />
      <BoxTitle title={"Update Password"} />
      <Box className={"h-350"}>
        <InputText
          isPassword
          placeholder={"Enter old password"}
          text={oldPassword}
          setText={setOldPassword}
        />
        <InputText
          isPassword
          placeholder={"Enter new password"}
          text={newPassword}
          setText={setNewPassword}
        />
        <InputText
          isPassword
          placeholder={"Re-enter new password"}
          text={resetPassword}
          setText={setResetPassword}
        />
        <Button buttonText={"Update Password"} buttonFun={updatePassword} />
        <BoxResult resultContents={resultContents} />
      </Box>
    </Container>
  );
};

export default UpdatePassword;
