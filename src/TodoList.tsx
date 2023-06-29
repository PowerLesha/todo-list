import React from "react";
import { useState } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import Calendar from "react-calendar";

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

function TodoList(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);

  let removeTask = () => {
    if (window.confirm("Are you sure ?")) props.removeTodoList(props.id);
  };

  const addTask = (title: string) => {
    props.addItem(title, props.id);
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);
  };

  return (
    <div className="boss">
      <div className="editable-span">
        <h3>
          <EditableSpan title={props.title} onChange={changeTodoListTitle} />

          <button
            title="delete"
            className="remove-buttons"
            onClick={removeTask}
          >
            X
          </button>
        </h3>
      </div>

      <AddItemForm addItem={addTask} />

      <div className="tasks-counter">
        {props.filter !== "all" && props.task.length > 1
          ? "You have " + props.task.length + " " + props.filter + "  tasks"
          : "" || (props.filter !== "all" && props.task.length === 1)
          ? "You have " + props.task.length + " " + props.filter + " task"
          : "" || (props.filter && props.task.length === 0)
          ? "You don't have any tasks"
          : "" || (props.filter === "all" && props.task.length > 1)
          ? "You have " + props.task.length + " tasks"
          : "You have " + props.task.length + " task"}
      </div>

      <ul>
        {props.task.map((t) => (
          <li className={t.isDone ? "is-done" : ""} key={t.id}>
            <input
              className="main-input"
              type="checkbox"
              checked={t.isDone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
              }
            />
            <EditableSpan
              title={t.title}
              onChange={(newTitle: string) => {
                props.changeTaskTitle(t.id, newTitle, props.id);
              }}
            />
            <button
              title="delete"
              className="remove-buttons"
              onClick={() => props.removeTask(t.id, props.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>

      <div className="buttons">
        <button
          className={props.filter === "all" ? "active-filter" : "tasks-buttons"}
          onClick={onAllClickHandler}
        >
          All
        </button>

        <button
          className={
            props.filter === "active" ? "active-filter" : "tasks-buttons"
          }
          onClick={onActiveClickHandler}
        >
          Active
        </button>

        <button
          className={
            props.filter === "completed" ? "active-filter" : "tasks-buttons"
          }
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default TodoList;
