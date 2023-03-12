import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";

const TodoResults = () => {
  // Fix an ability to calculate completed tasks
  const { todosChecked } = useSelector((store) => store.todos);

  return <div className="todo-results">Done: {todosChecked}</div>;
};

export default TodoResults;
