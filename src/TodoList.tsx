import React from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Checkbox } from "@mui/material";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { FcCalendar } from "react-icons/fc";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
  deadline: boolean;
  date: any;
};

type PropsType = {
  changeDeadline: Function;
  deadline: boolean;
  setDeadline: Function;
  title: string;
  id: string;
  removeTask: Function;
  removeTodoList: (id: string) => void;
  changeFilter: (type: FilterValuesType, todolistId: string) => void;
  setDeadlineCalendar: Function;
  filter: FilterValuesType;
  task: Array<TaskType>;
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
  changeDeadline,
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
  setDeadlineCalendar,
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
            <Checkbox
              className="main-input"
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
            <FcCalendar
              className="deadline-button"
              onClick={() => setDeadlineCalendar(t.id, id, t.deadline, t.date)}
            />

            {t.deadline && (
              <DatePicker
                onChange={(newDate) => changeDeadline(t.id, id, newDate)}
                value={t.date}
                className="react-date-picker__wrapper"
              />
            )}
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
