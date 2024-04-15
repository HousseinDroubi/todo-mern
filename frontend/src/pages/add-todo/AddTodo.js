import Navigation from "../../components/navigation/Navigation";
import Container from "../../components/container/Container";
import Box from "../../components/box/Box";
import BoxTitle from "../../components/box-title/BoxTitle";
import Button from "../../components/button/Button";
import BoxResult from "../../components/box-result/BoxResult";
import axios from "axios";

import "./AddTodo.css";
import { useEffect, useRef, useState } from "react";
import TextArea from "../../components/text-area/TextArea";

const AddTodo = () => {
  const [title, setTitle] = useState("");
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
      if (array[0] === "token") {
        token.current = array[1];
      }
    });
  }, []);

  const addTodo = () => {
    if (title.length < 5 || title.length > 100) {
      updateResult(true, "Title must be between 5 and 100 characters");
    } else {
      const url = `${process.env.REACT_APP_TODO_URL}/add`;
      const body = {
        title,
      };

      axios
        .post(url, body, {
          headers: {
            Authorization: `Bearer ${token.current}`,
          },
        })
        .then((res) => {
          if (res.data.result === "todo_added") {
            const old_todos = JSON.parse(localStorage.getItem("todos"));
            const new_todo = {
              _id: res.data.new_todo_id,
              date: res.data.new_todo_date,
              title,
            };
            old_todos.push(new_todo);
            localStorage.setItem("todos", JSON.stringify(old_todos));
            updateResult(false, "Todo added");
            setTitle("");
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
      <Navigation page={"add_todo"} />
      <BoxTitle title={"Add Todo"} />
      <Box className={"h-350"}>
        <TextArea text={title} setText={setTitle} />
        <Button buttonText={"Add Todo"} buttonFun={addTodo} />
        <BoxResult resultContents={resultContents} />
      </Box>
    </Container>
  );
};

export default AddTodo;
