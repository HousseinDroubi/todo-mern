import { useEffect, useRef, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import Todo from "../../components/todo/Todo";
import "./AllTodos.css";
const AllTodos = () => {
  const [allTodos, setAllTodos] = useState([]);
  const token = useRef("");

  useEffect(() => {
    setAllTodos(JSON.parse(localStorage.getItem("todos")));

    const cookies = decodeURIComponent(document.cookie);
    const array = cookies.split("; ");
    array.forEach((element) => {
      const array = element.split("=");
      if (array[0] === "token") {
        token.current = array[1];
      }
    });
  }, []);

  const todoDeleted = (todo_id) => {
    const todos_copy = [...allTodos];
    const index = todos_copy.findIndex((element) => element._id === todo_id);
    todos_copy.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos_copy));
    setAllTodos(todos_copy);
  };

  return (
    <article className="flex j-c-s-e todos_container">
      <Navigation page={"all_todos"} />

      {allTodos.length === 0 ? (
        <h1 className="color-blue">No Todos Yet</h1>
      ) : (
        allTodos.map((todo) => (
          <Todo
            key={todo._id}
            _id={todo._id}
            title={todo.title}
            token={token.current}
            date={new Date(todo.date).toLocaleString()}
            todoDeleted={() => todoDeleted(todo._id)}
          />
        ))
      )}
    </article>
  );
};

export default AllTodos;
