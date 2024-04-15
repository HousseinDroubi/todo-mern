import { Router } from "express";
import {
  addTodo,
  getAllTodos,
  deleteTodo,
  updateTodo,
} from "../controllers/todo.controller.js";
import { checkToken } from "../middlewares/authentication.middleware.js";
import { checkTodoPermission } from "../middlewares/todo.middleware.js";

const router = Router();

router.post("/add", checkToken, addTodo);
router.get("/", checkToken, getAllTodos);
router.delete("/:todo_id", checkToken, checkTodoPermission, deleteTodo);
router.put("/update/:todo_id", checkToken, checkTodoPermission, updateTodo);

export default router;
