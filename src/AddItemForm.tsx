import { ChangeEvent, useState } from "react";

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
};
export function AddItemForm(props: AddItemFormPropsType) {
  let [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const addOneTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle("");
    } else setError("title is required");
  };
  const onNewTypeTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addOneTask();
    }
  };
  return (
    <div className="input-content">
      <div className="standart-input">
        <input
          className={error ? "error" : ""}
          value={newTaskTitle}
          onChange={onNewTypeTitleChangeHandler}
          onKeyDown={onKeyPressHandler}
        />
        {
          <button className="input-button" onClick={addOneTask}>
            +
          </button>
        }
        <div className="error-message">
          {error ? <div className="error-message"> {error} </div> : ""}
        </div>
      </div>
    </div>
  );
}
