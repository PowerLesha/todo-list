import { ChangeEvent, memo, useState } from "react";
import { VscEdit } from "react-icons/vsc";
export type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};
export const EditableSpan = memo(function EditableSpan(
  props: EditableSpanPropsType
) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    if (title.trim() !== "") {
      setEditMode(false);
      props.onChange(title);
    } else setError("title is required");
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      activateViewMode();
    }
  };
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <div className="editable-span">
      {editMode ? (
        <div>
          <input
            className={error ? "error" : ""}
            value={title}
            onChange={onChangeTitleHandler}
            onBlur={activateViewMode}
            autoFocus
            onKeyDown={onEnterPress}
          />

          <button
            className="edit-button"
            onClick={activateViewMode}
            title="edit"
          >
            <VscEdit className="edit-icon" />
          </button>
          <div>
            {error ? <div className="error-message"> {error} </div> : ""}
          </div>
        </div>
      ) : (
        <div className="editable-span">
          <span>{props.title}</span>
          <button
            className="edit-button"
            onClick={activateEditMode}
            title="edit"
          >
            <VscEdit className="edit-icon" />
          </button>
        </div>
      )}
    </div>
  );
});
