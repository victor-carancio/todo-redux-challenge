import { useSelector } from "react-redux";

const TodoResults = () => {
  const { todosChecked } = useSelector((store) => store.todos);

  return <div className="todo-results">To do completed: {todosChecked}</div>;
};

export default TodoResults;
