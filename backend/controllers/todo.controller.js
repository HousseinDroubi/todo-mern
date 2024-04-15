import Todo from "../models/todo.model.js";
import {
  validateAddTodo,
  validateUpdateTodo,
} from "../validations/todo.validation.js";

const addTodo = async (req, res) => {
  const { error } = validateAddTodo(req.body);
  if (error) {
    return res.json({
      error_message: error.details[0].message,
    });
  }

  const data = req.data;

  const todo = await Todo.create({
    title: req.body.title,
    user_id: data._id,
  });

  return res.json({
    result: "todo_added",
    new_todo_id: todo._id,
    new_todo_date: todo.date,
  });
};

const getAllTodos = async (req, res) => {
  const todos = await Todo.find().where("user_id").equals(req.data._id);

  return res.json({
    result: "done",
    todos,
  });
};

const deleteTodo = async (req, res) => {
  await Todo.deleteOne().where("_id").equals(req.params.todo_id);

  return res.json({
    result: "todo_deleted",
  });
};

const updateTodo = async (req, res) => {
  const { error } = validateUpdateTodo(req.body);
  if (error) {
    return res.json({
      error_message: error.details[0].message,
    });
  }

  const todo = req.todo;
  todo.title = req.body.title;
  await todo.save();

  return res.json({
    result: "todo_updated",
  });
};

export { addTodo, getAllTodos, deleteTodo, updateTodo };
