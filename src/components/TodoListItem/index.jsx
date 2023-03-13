import { FaTrash } from "react-icons/fa";
import { BsFillCheckSquareFill } from "react-icons/bs";

const TodoListItem = ({ id, onCheck, checked, onDelete, label }) => {
  return (
    <div className="todo-list-item">
      <div
        className="todo-list-item-check"
        onClick={() => onCheck(id, checked)}
      >
        {checked && <BsFillCheckSquareFill />}
      </div>
      <div className="todo-list-item-content">
        <div className={checked ? "todo-list-item-checked label" : "label"}>
          {label}
        </div>

        <div className="todo-list-item-delete" onClick={() => onDelete(id)}>
          <FaTrash />
        </div>
      </div>
    </div>
  );
};

export default TodoListItem;
