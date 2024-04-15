import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import AllTodos from "./pages/all-todos/AllTodos";
import AddTodo from "./pages/add-todo/AddTodo";
import UpdateTodo from "./pages/update-todo/UpdateTodo";
import UpdatePassword from "./pages/update-password/UpdatePassword";
import UpdateUsername from "./pages/update-username/UpdateUsername";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/all-todos" element={<AllTodos />} />
        <Route path="/add-todo" element={<AddTodo />} />
        <Route path="/update-todo/:todo_id" element={<UpdateTodo />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/update-username" element={<UpdateUsername />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
