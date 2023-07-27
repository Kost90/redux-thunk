import styles from './Taskitem.module.css'
import React, { useState} from "react";
import TasksForm from "../Taskform/TasksForm";
import { useDispatch } from "react-redux";
import { EditTodo } from "../../Tasks/TasksSlicer";

function TasksItem({ text, id, onDelete }) {

  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const handleEdit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const editedTAsk = {
      id: id,
      text: formData.get("text"),
      status: false,
    };

    dispatch(EditTodo(editedTAsk));
    toggleEditing(false);
  };

  return (
    <li className={styles.container}>
      {isEditing ? (
        <TasksForm
          onSubmit={handleEdit}
          titel={"Edit"}
          defaultValues={{ text }}
        />
      ) : (
        <>
          <p>{text}</p>
          <button type="button" onClick={toggleEditing}>
            Edit Task
          </button>
          <button type="button" onClick={() => onDelete(id)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default TasksItem;
