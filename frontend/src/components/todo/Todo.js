import { useNavigate } from "react-router-dom";
import "./Todo.css";
import axios from "axios";

const Todo = ({ title, date, _id, token, todoDeleted }) => {
  const navigate = useNavigate();

  return (
    <section className="todo flex flex-column j-c-c a-i-c">
      <h2>{title}</h2>
      <h4 className="w-100">{date}</h4>
      <div className="mt-20 flex j-c-s-e w-100">
        <button
          onClick={() => {
            navigate(`/update-todo/${_id}`);
          }}
        >
          View
        </button>
        <button
          onClick={() => {
            const url = `${process.env.REACT_APP_TODO_URL}/${_id}`;
            axios
              .delete(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                if (res.data.result === "todo_deleted") {
                  todoDeleted();
                }
              });
          }}
        >
          Delete
        </button>
      </div>
    </section>
  );
};
export default Todo;
