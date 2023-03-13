import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "features/tasks/todosSlice";
import TodoListItem from "../TodoListItem/index";

import Toast from "components/Toast";

const TodoList = () => {
  const { todosList } = useSelector((store) => store.todos);

  const dispatch = useDispatch();

  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  const toggleCheck = (todoId, isChecked) => {
    dispatch(updateTodo({ id: todoId, checked: !isChecked }));
  };

  return (
    <div className="todo-list">
      <Toast />
      <span className="todo-list-title">Things to do:</span>
      {todosList.length >= 1 && (
        <div className="todo-list-content">
          {todosList.map((todo) => {
            return (
              <TodoListItem
                key={todo.id}
                {...todo}
                onCheck={toggleCheck}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      )}
      {todosList.length < 1 && (
        <div className="no-todos">
          Looks like you&apos;re absolutely free today!
        </div>
      )}
    </div>
  );
};

export default TodoList;
