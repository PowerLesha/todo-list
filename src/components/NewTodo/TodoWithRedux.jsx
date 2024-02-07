import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskList,
  deleteTaskList,
  updateTaskTitle,
  addOneTask,
  deleteTask,
  updateTaskStatus,
  selectTaskLists,
  updateTaskListTitle,
} from "../../features/listSlice/listSlice";
import { v4 } from "uuid";

function TodoWithRedux() {
  const taskLists = useSelector((state) => state.lists.taskLists);
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedListId, setSelectedListId] = useState("");
  const [newListTitle, setNewListTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");

  const handleAddList = () => {
    if (newListTitle.trim() !== "") {
      dispatch(addTaskList({ id: v4(), title: newListTitle }));
      setNewListTitle("");
    }
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "" && selectedListId !== "") {
      dispatch(
        addOneTask({
          listId: selectedListId,
          task: { id: v4(), title: newTaskTitle, isDone: false },
        })
      );
      setNewTaskTitle("");
    }
  };

  const handleDeleteList = useCallback(
    (listId) => {
      dispatch(deleteTaskList(listId));
    },
    [dispatch]
  );

  const handleUpdateTitle = (listId, newTitle) => {
    dispatch(updateTaskTitle({ id: listId, title: newTitle }));
  };

  const handleEditTask = (taskId, taskTitle) => {
    setEditingTaskId(taskId);
    setEditedTaskTitle(taskTitle);
  };

  const handleSaveEditedTask = (taskId, title, listId) => {
    // Dispatch action to update task title
    dispatch(
      updateTaskTitle({
        listId: listId,
        taskId: taskId,
        title: title,
      })
    );
    setEditingTaskId(null);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter new list title"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
        />
        <button onClick={handleAddList}>Add List</button>

        <div>
          <select onChange={(e) => setSelectedListId(e.target.value)}>
            <option value="">Select List</option>
            {taskLists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter new task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <div
          style={{
            position: "relative",
            marginLeft: "400px",
            marginBottom: "100px",
          }}
        >
          {taskLists.map((list) => (
            <div key={list.id}>
              <input
                type="text"
                value={list.title}
                onChange={(e) =>
                  dispatch(
                    updateTaskListTitle({
                      id: list.id,
                      title: e.target.value,
                    })
                  )
                }
              />
              <button onClick={() => dispatch(deleteTaskList(list.id))}>
                Delete
              </button>

              <ul>
                {list.tasks.map((task) => (
                  <li key={task.id}>
                    {editingTaskId === task.id ? (
                      <>
                        <input
                          type="text"
                          value={editedTaskTitle}
                          onChange={(e) => setEditedTaskTitle(e.target.value)}
                        />
                        <button
                          onClick={() =>
                            handleSaveEditedTask(
                              task.id,
                              editedTaskTitle,
                              list.id
                            )
                          }
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        {task.title}
                        <button
                          onClick={() => handleEditTask(task.id, task.title)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoWithRedux;
