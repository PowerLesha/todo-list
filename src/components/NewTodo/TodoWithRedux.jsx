import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskList,
  deleteTaskList,
  updateTaskTitle,
  addOneTask,
  updateTaskStatus,
  selectTaskLists,
  updateTaskListTitle,
  deleteOneTask,
  getAllLists,
} from "../../features/listSlice/listSlice";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Login from "./Login";

function TodoWithRedux() {
  const taskLists = useSelector(selectTaskLists);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedListId, setSelectedListId] = useState("");
  const [newListTitle, setNewListTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's authentication status
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      setUsername(decodedToken.username);
      setIsLoggedIn(true);
    }

    // Dispatch getAllLists when the component mounts
    dispatch(getAllLists()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const decodeToken = (token) => {
    // Decode JWT token to get user information
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const handleAddList = () => {
    if (newListTitle.trim() !== "") {
      dispatch(addTaskList({ id: uuidv4(), title: newListTitle }));
      setNewListTitle("");
    }
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "" && selectedListId !== "") {
      dispatch(
        addOneTask({
          listId: selectedListId,
          task: { id: uuidv4(), title: newTaskTitle, isDone: false },
        })
      );
      setNewTaskTitle("");
    }
  };

  const handleDeleteTask = (listId, taskId) => {
    dispatch(deleteOneTask({ listId, taskId }));
  };

  const handleDeleteList = (listId) => {
    dispatch(deleteTaskList({ listId: listId }));
  };

  const handleUpdateTaskTitle = (listId, newTitle) => {
    dispatch(updateTaskListTitle({ listId, title: newTitle }));
  };

  const handleUpdateTaskStatus = (listId, taskId, isDone) => {
    dispatch(updateTaskStatus({ listId, taskId, isDone }));
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

  const handleLoginSuccess = (username) => {
    // Set isLoggedIn to true when login is successful
    setIsLoggedIn(true);
    setUsername(username);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
  };
  return (
    <div className="App">
      <h1>Todo App</h1>
      {isLoggedIn && ( // Render the todo list only if the user is logged in
        <div>
          <h2>Welcome, {username}!</h2> {/* Display username */}
          <button onClick={handleLogout}>Logout</button>
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
              {loading && (
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>
              )}{" "}
              {/* Render loader while loading */}{" "}
              {!loading &&
                taskLists.map((list) => (
                  <div key={list.id}>
                    <input
                      type="text"
                      value={list.title}
                      onChange={(e) =>
                        handleUpdateTaskTitle(list.id, e.target.value)
                      }
                    />
                    <button onClick={() => handleDeleteList(list.id)}>
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
                                onChange={(e) =>
                                  setEditedTaskTitle(e.target.value)
                                }
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
                              <input
                                checked={task.isDone}
                                onChange={() =>
                                  handleUpdateTaskStatus(
                                    list.id,
                                    task.id,
                                    task.isDone
                                  )
                                }
                                type="checkbox"
                              ></input>
                              <button
                                onClick={() =>
                                  handleEditTask(task.id, task.title)
                                }
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteTask(list.id, task.id)
                                }
                              >
                                Delete
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
      )}
      {!isLoggedIn && <Login onLoginSuccess={handleLoginSuccess} />}{" "}
      {/* Render login component when not logged in */}
    </div>
  );
}

export default TodoWithRedux;
