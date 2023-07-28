import { ChangeEvent, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
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
        <TextField
          variant="outlined"
          label="Type value"
          className={error ? "error" : ""}
          error={!!error}
          value={newTaskTitle}
          onChange={onNewTypeTitleChangeHandler}
          onKeyDown={onKeyPressHandler}
          helperText={error}
        />
        {
          <IconButton color="default" onClick={addOneTask}>
            <ControlPointIcon />
          </IconButton>
        }
      </div>
    </div>
  );
}
