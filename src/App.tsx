import { useEffect, useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import { v4 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { CiCircleList } from "react-icons/ci";
import ClockComponent from "./ClockComponent";
import SwitchMode from "./SwitchMode";
import { GoogleLogin } from "react-google-login";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type TasksStateType = {
  [key: string]: Array<TaskType>;
};
function App() {
  const [deadline, setDeadline] = useState(false);
  const [login, setLogin] = useState(true);
  const [nightMode, setNightMode] = useState(false);
  const deadlineDate = useState<Value>(null);
  const loginSuccess = (response: any) => {
    setLogin(false);
    console.log("Logged in successfully:", response);
  };
  function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
    let tasks = task[todolistId];
    let tasker = tasks.find((t) => t.id === id);
    if (tasker) {
      tasker.isDone = isDone;
    }

    setTask({ ...task });
  }

  function setDeadlineCalendar(id: string, todolistId: string) {
    let tasks = task[todolistId];
    if (tasks !== undefined) {
      tasks.forEach((t) => {
        if (t.id === id) {
          t.deadline = !t.deadline;
        }
      });
      setTask({ ...task });
    }
  }

  function changeDeadline(id: string, todolistId: string, newDate: Date) {
    let tasks = task[todolistId];
    if (tasks !== undefined) {
      tasks.forEach((t) => {
        if (t.id === id) {
          t.date = newDate; // Set the date property when the deadline is enabled
        }
      });
      setTask({ ...task });
    }
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    let tasks = task[todolistId];
    let tasker = tasks.find((t) => t.id === id);
    if (tasker) {
      tasker.title = newTitle;
    }

    setTask({ ...task });
  }

  function removeTask(id: string, todolistId: string) {
    let tasks = task[todolistId];
    let filteredTask = tasks.filter((t) => t.id !== id);
    task[todolistId] = filteredTask;
    setTask({ ...task });
  }

  function addTask(title: string, todolistId: string) {
    let newTask = {
      id: v4(),
      title: title,
      isDone: false,
      deadline: false,
      date: deadlineDate,
    };
    let tasks = task[todolistId];
    let newTasks = [newTask, ...tasks];
    task[todolistId] = newTasks;
    setTask({ ...task });
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodoLists([...todolists]);
    }
  }

  function changeTodoListTitle(id: string, newTitle: string) {
    let todolist = todolists.find((tl) => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodoLists([...todolists]);
    }
  }

  let todolistId1 = v4();

  let todolistId2 = v4();

  let todolistId3 = v4();

  let [todolists, setTodoLists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What ot learn", filter: "active" },
    { id: todolistId2, title: "What to buy", filter: "completed" },
    { id: todolistId3, title: "what to do", filter: "all" },
  ]);

  let removeTodoList = (todolistId: string) => {
    let filteredTodoList = todolists.filter((tl) => tl.id !== todolistId);

    setTodoLists(filteredTodoList);
  };

  let [task, setTask] = useState<TasksStateType>({
    [todolistId1]: [
      {
        id: v4(),
        title: "Html",
        isDone: true,
        deadline: false,
        date: deadlineDate,
      },
      {
        id: v4(),
        title: "gabascript",
        isDone: false,
        deadline: false,
        date: deadlineDate,
      },
    ],
    [todolistId2]: [
      {
        id: v4(),
        title: "book",
        isDone: true,
        deadline: false,
        date: deadlineDate,
      },
      {
        id: v4(),
        title: "coffee",
        isDone: false,
        deadline: false,
        date: deadlineDate,
      },
    ],
    [todolistId3]: [
      {
        id: v4(),
        title: "smth",
        isDone: true,
        deadline: false,
        date: deadlineDate,
      },
    ],
  });

  function addList(title: string) {
    let todolist: TodolistType = {
      id: v4(),
      title: title,
      filter: "all",
    };
    setTodoLists([todolist, ...todolists]);
    setTask({ ...task, [todolist.id]: [] });
  }

  useEffect(() => {
    // Save todolists and task to localStorage
    localStorage.setItem("todolists", JSON.stringify(todolists));
    localStorage.setItem("task", JSON.stringify(task));
  }, [todolists, task]);
  const savedTodoLists = localStorage.getItem("todolists");
  const savedTasks = localStorage.getItem("task");
  useEffect(() => {
    if (savedTodoLists) {
      const parsedTodoLists = JSON.parse(savedTodoLists);
      setTodoLists(parsedTodoLists);
    }

    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTask(parsedTasks);
    }
  }, []);

  return (
    <div className={nightMode ? "night-mode" : ""}>
      <SwitchMode nightMode={nightMode} setNightMode={setNightMode} />
      <div className="task-list">
        <h1>
          Add a new task list <CiCircleList />
        </h1>
        <div
          style={{
            paddingLeft: "1070px",
            position: "absolute",
            maxWidth: "15px",
          }}
        >
          <GoogleLogin
            clientId="628100592681-gjtv7a1ooc89mubcapqlj68jv3q3gsr1.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={loginSuccess}
            onFailure={loginSuccess}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div className="date-component">
          <ClockComponent />
        </div>

        <div className="all-tasklists">
          <AddItemForm addItem={addList} />
        </div>
      </div>
      <div className="App">
        {todolists.map((tl) => {
          let tasksForTodoList = task[tl.id];
          if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(
              (t) => t.isDone === true
            );
          }
          if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(
              (t) => t.isDone === false
            );
          }

          return (
            <TodoList
              changeDeadline={changeDeadline}
              setDeadline={setDeadline}
              key={tl.id}
              deadline={deadline}
              id={tl.id}
              filter={tl.filter}
              removeTodoList={removeTodoList}
              title={tl.title}
              task={tasksForTodoList}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addItem={addTask}
              changeTaskStatus={changeTaskStatus}
              changeTaskTitle={changeTaskTitle}
              changeTodoListTitle={changeTodoListTitle}
              setDeadlineCalendar={setDeadlineCalendar}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
