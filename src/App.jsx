import React from "react";
import TodoList from "./components/TodoList";
import TodoResults from "./components/TodoResults";
import TodoForm from "./components/TodoForm";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodosList, totalDone } from "features/tasks/todosSlice";

const App = () => {
  const { todosList } = useSelector((store) => store.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosList());
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(totalDone());
    //eslint-disable-next-line
  }, [todosList]);

  return (
    <div className="root">
      <TodoList />
      <TodoResults />
      <TodoForm />
    </div>
  );
};

export default App;
