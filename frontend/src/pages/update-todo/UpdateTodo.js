import Navigation from "../../components/navigation/Navigation";
import { useEffect, useRef, useState } from "react";
import BoxResult from "../../components/box-result/BoxResult";
import BoxTitle from "../../components/box-title/BoxTitle";
import Box from "../../components/box/Box";
import Button from "../../components/button/Button";
import Container from "../../components/container/Container";
import "./UpdateTodo.css";

import axios from "axios";
import TextArea from "../../components/text-area/TextArea";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTodo = () => {
  const [title, setTitle] = useState("");
  const token = useRef("");
  const navigate = useNavigate();
  const { todo_id } = useParams();
  const [todos, setTodos] = useState([]);

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

    setTodos(JSON.parse(localStorage.getItem("todos")));
  }, []);

  useEffect(() => {
    if (todos.length !== 0) {
      const todo = todos.find((element) => element._id === todo_id);
      if (todo) {
        setTitle(todo.title);
      } else {
        navigate("/all-todos");
      }
    }
  }, [todos]);

  const updateTodo = () => {
    if (title.length < 5 || title.length > 100) {
      updateResult(true, "Title must be between 5 and 100 characters");
    } else {
      const url = `${process.env.REACT_APP_TODO_URL}/update/${todo_id}`;
      const body = {
        title,
      };

      axios
        .put(url, body, {
          headers: {
            Authorization: `Bearer ${token.current}`,
          },
        })
        .then((res) => {
          if (res.data.result === "todo_updated") {
            updateResult(false, "Todo updated");
            const todos_copy = [...todos];
            const index = todos_copy.findIndex(
              (element) => element._id === todo_id
            );
            todos_copy[index] = {
              ...todos_copy[index],
              title,
            };

            setTodos(todos_copy);
            localStorage.setItem("todos", JSON.stringify(todos_copy));
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
      {/* //! There is no need for the old props page here, because there is no specific image for update todo */}
      <Navigation />
      <BoxTitle title={"Update Todo"} />
      <Box className={"h-350"}>
        <TextArea text={title} setText={setTitle} />
        <Button buttonText={"Update Todo"} buttonFun={updateTodo} />
        <BoxResult resultContents={resultContents} />
      </Box>
    </Container>
  );
};

export default UpdateTodo;
