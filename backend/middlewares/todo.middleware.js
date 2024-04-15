import { checkObjectId } from "../functions/reusable_functions.js";
import Todo from "../models/todo.model.js";

const checkTodoPermission = async (req, res, next) => {
  if (!req.params.todo_id) {
    return res.json({
      result: "missing_todo_id",
    });
  }

  if (!checkObjectId(req.params.todo_id)) {
    return res.json({
      result: "todo_id_is_invalid",
    });
  }

  const todo = await Todo.findOne()
    .where("user_id")
    .equals(req.data._id)
    .where("_id")
    .equals(req.params.todo_id);

  if (!todo) {
    return res.json({
      result: "not_your_todo",
    });
  }

  req.todo = todo;

  next();
};

export { checkTodoPermission };
