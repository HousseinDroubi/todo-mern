import { useNavigate } from "react-router-dom";
import "./Navigation.css";

import AllTodos from "../../assets/icons/all-todos.svg";
import AddTodo from "../../assets/icons/add-todo.svg";
import UpdatePassword from "../../assets/icons/password.svg";
import UpdateUsername from "../../assets/icons/username.svg";

const Navigation = ({ page }) => {
  const navigate = useNavigate();
  return (
    <nav className="nav flex j-c-s-b a-i-c w-100">
      <section>
        <h2>Todo</h2>
      </section>
      <section>
        <ul className="flex">
          <li
            className={`mr-30 ${page === "all_todos" ? "bottom-bordered" : ""}`}
          >
            <a
              onClick={() => {
                navigate("/all-todos");
              }}
            >
              <img src={AllTodos} alt="" />
            </a>
          </li>
          <li
            className={`mr-30 ${page === "add_todo" ? "bottom-bordered" : ""}`}
          >
            <a
              onClick={() => {
                navigate("/add-todo");
              }}
            >
              <img src={AddTodo} alt="" />
            </a>
          </li>
          <li
            className={`mr-30 ${
              page === "update_password" ? "bottom-bordered" : ""
            }`}
          >
            <a
              onClick={() => {
                navigate("/update-password");
              }}
            >
              <img src={UpdatePassword} alt="" />
            </a>
          </li>
          <li
            className={`mr-30 ${
              page === "update_username" ? "bottom-bordered" : ""
            }`}
          >
            <a
              onClick={() => {
                navigate("/update-username");
              }}
            >
              <img src={UpdateUsername} alt="" />
            </a>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Navigation;
