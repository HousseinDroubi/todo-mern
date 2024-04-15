import mongoose from "mongoose";

const todo_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

const Todo = mongoose.model("todos", todo_schema);
export default Todo;
