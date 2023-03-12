import React, { useState } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import { createTodo } from "../../features/tasks/todosSlice";
import { loadingToErrorToast } from "components/Toast";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      dispatch(createTodo({ label: todo, checked: false }));
      setTodo("");
      return;
    }
    loadingToErrorToast("The input can't be empty");
  };
  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Enter new to do"
          className="todo-input"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" className="btn-submit">
          ADD TO DO
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
