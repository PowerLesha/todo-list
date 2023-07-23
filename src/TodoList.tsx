import React from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

export type TaksType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  id: string;
  removeTask: Function;
  removeTodoList: Function;
  changeFilter: Function;
  filter: FilterValuesType;
  task: Array<TaksType>;
  addItem: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    TodoListId: string
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    TodoListId: string
  ) => void;
  changeTodoListTitle: (id: string, newTitle: string) => void;
};

function TodoList({
  title,
  id,
  removeTask,
  removeTodoList,
  changeFilter,
  filter,
  task,
  addItem,
  changeTaskStatus,
  changeTaskTitle,
  changeTodoListTitle,
}: PropsType) {
  const onAllClickHandler = () => changeFilter("all", id);
  const onCompletedClickHandler = () => changeFilter("completed", id);
  const onActiveClickHandler = () => changeFilter("active", id);

  const handleRemoveTask = () => {
    if (window.confirm("Are you sure?")) removeTodoList(id);
  };

  const addTask = (taskTitle: string) => {
    addItem(taskTitle, id);
  };

  const handleChangeTodoListTitle = (newTitle: string) => {
    changeTodoListTitle(id, newTitle);
  };

  return (
    <div className="boss">
      <div className="editable-span">
        <h3>
          <EditableSpan title={title} onChange={handleChangeTodoListTitle} />

          <button
            title="delete"
            className="remove-buttons"
            onClick={handleRemoveTask}
          >
            X
          </button>
        </h3>
      </div>

      <AddItemForm addItem={addTask} />

      <div className="tasks-counter">
        {(() => {
          if (filter !== "all" && task.length > 1) {
            return `You have ${task.length} ${filter} tasks`;
          } else if (filter !== "all" && task.length === 1) {
            return `You have ${task.length} ${filter} task`;
          } else if (filter && task.length === 0) {
            return "You don't have any tasks";
          } else if (filter === "all" && task.length > 1) {
            return `You have ${task.length} tasks`;
          } else {
            return `You have ${task.length} task`;
          }
        })()}

        {/* {(() => {
          switch (true) {
            case filter !== "all" && task.length > 1:
              return (
                "You have " + task.length + " " + filter + " tasks"
              );
            case filter !== "all" && task.length === 1:
              return (
                "You have " + task.length + " " + filter + " task"
              );
            case filter && task.length === 0:
              return "You don't have any tasks";
            case filter === "all" && task.length > 1:
              return "You have " + task.length + " tasks";
            default:
              return "You have " + task.length + " task";
          }
        })()}  */}

        {/* {filter !== "all" && task.length > 1
          ? "You have " + task.length + " " + filter + "  tasks"
          : "" || (filter !== "all" && task.length === 1)
          ? "You have " + task.length + " " + filter + " task"
          : "" || (filter && task.length === 0)
          ? "You don't have any tasks"
          : "" || (filter === "all" && task.length > 1)
          ? "You have " + task.length + " tasks"
          : "You have " + task.length + " task"} */}
      </div>

      <ul>
        {task.map((t) => (
          <li className={t.isDone ? "is-done" : ""} key={t.id}>
            <input
              className="main-input"
              type="checkbox"
              checked={t.isDone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeTaskStatus(t.id, e.currentTarget.checked, id)
              }
            />
            <EditableSpan
              title={t.title}
              onChange={(newTitle: string) => {
                changeTaskTitle(t.id, newTitle, id);
              }}
            />
            <button
              title="delete"
              className="remove-buttons"
              onClick={() => removeTask(t.id, id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>

      <div className="buttons">
        <button
          className={filter === "all" ? "active-filter" : "tasks-buttons"}
          onClick={onAllClickHandler}
        >
          All
        </button>

        <button
          className={filter === "active" ? "active-filter" : "tasks-buttons"}
          onClick={onActiveClickHandler}
        >
          Active
        </button>

        <button
          className={filter === "completed" ? "active-filter" : "tasks-buttons"}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default TodoList;
