import { useCallback, useEffect, useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./components/TodoList";
import { v4 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";
import { CiCircleList } from "react-icons/ci";
import ClockComponent from "./components/ClockComponent";
import SwitchMode from "./components/SwitchMode";
import TodoWithRedux from "./components/NewTodo/TodoWithRedux";

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
  const [todoWithRedux, setTodoWithRedux] = useState(false);

  const handleSetTodoWithRedux = () => {
    setTodoWithRedux(!todoWithRedux);
  };

  const [nightMode, setNightMode] = useState(false);
  const deadlineDate = useState<Value>(null);
  let todolistId1 = v4();

  let todolistId2 = v4();

  let todolistId3 = v4();

  let [todolists, setTodoLists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What ot learn", filter: "active" },
    { id: todolistId2, title: "What to buy", filter: "completed" },
    { id: todolistId3, title: "what to do", filter: "all" },
  ]);
  const [task, setTask] = useState<TasksStateType>({
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

  const style: React.CSSProperties = {
    paddingLeft: "1070px",
    position: "absolute",
    maxWidth: "50px",
    marginBottom: "90px",
    marginLeft: "34px",
  };
  const mediaQuery = `(max-width: 1000px)`;
  if (window.matchMedia(mediaQuery).matches) {
    // If the condition is met, update the style
    style.marginRight = "805px";
    style.marginBottom = "280px";
  }

  const changeTaskStatus = useCallback(
    (id: string, isDone: boolean, todolistId: string) => {
      let tasks = task[todolistId];
      let tasker = tasks.find((t) => t.id === id);
      if (tasker) {
        tasker.isDone = isDone;
      }

      setTask({ ...task });
    },
    [task]
  );

  const onHandleSetDeadlineCalendar = useCallback(
    (id: string, todolistId: string) => {
      let tasks = task[todolistId];
      if (tasks !== undefined) {
        tasks.forEach((t) => {
          if (t.id === id) {
            t.deadline = !t.deadline; // Toggle deadline icon to be able to set the deadline
          }
        });
        setTask({ ...task });
      }
    },
    [task]
  );

  const onHandleChangeDeadline = useCallback(
    (id: string, todolistId: string, newDate: Date) => {
      let tasks = task[todolistId];
      if (tasks !== undefined) {
        tasks.forEach((t) => {
          if (t.id === id) {
            t.date = newDate; // Set the date property when the deadline is enabled
          }
        });
        setTask({ ...task });
      }
    },
    [task]
  );

  const changeTaskTitle = useCallback(
    (id: string, newTitle: string, todolistId: string) => {
      let tasks = task[todolistId];
      let tasker = tasks.find((t) => t.id === id);
      if (tasker) {
        tasker.title = newTitle;
      }

      setTask({ ...task });
    },
    [task]
  );

  const removeTask = useCallback(
    (id: string, todolistId: string) => {
      let tasks = task[todolistId];
      let filteredTask = tasks.filter((t) => t.id !== id);
      task[todolistId] = filteredTask;
      setTask({ ...task });
    },
    [task]
  );

  const addTask = useCallback(
    (title: string, todolistId: string) => {
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
    },
    [task, deadlineDate, todolists]
  );

  const changeFilter = useCallback(
    (value: FilterValuesType, todolistId: string) => {
      let todolist = todolists.find((tl) => tl.id === todolistId);
      if (todolist) {
        todolist.filter = value;
        setTodoLists([...todolists]);
      }
    },
    [todolists]
  );

  const changeTodoListTitle = useCallback(
    (id: string, newTitle: string) => {
      let todolist = todolists.find((tl) => tl.id === id);
      if (todolist) {
        todolist.title = newTitle;
        setTodoLists([...todolists]);
      }
    },
    [todolists]
  );

  const removeTodoList = useCallback(
    (todolistId: string) => {
      let filteredTodoList = todolists.filter((tl) => tl.id !== todolistId);

      setTodoLists(filteredTodoList);
    },
    [todolists]
  );

  const addList = useCallback(
    (title: string) => {
      let todolist: TodolistType = {
        id: v4(),
        title: title,
        filter: "all",
      };
      setTodoLists([todolist, ...todolists]);
      setTask({ ...task, [todolist.id]: [] });
    },
    [task, todolists]
  );

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
    <>
      {todoWithRedux && <TodoWithRedux />}

      <div className={nightMode ? "night-mode" : "light-mode"}>
        <SwitchMode nightMode={nightMode} setNightMode={setNightMode} />
        <div className="another-todo">
          <h3>Try another todo app created with Redux Toolkit</h3>
          <button className="tasks-buttons" onClick={handleSetTodoWithRedux}>
            Click here
          </button>
        </div>
        <div className="task-list">
          <div className="main-h1">
            <h1>
              Add a new task list <CiCircleList />
            </h1>
          </div>
          <div style={style}></div>
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
                changeDeadline={onHandleChangeDeadline}
                key={tl.id}
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
                setDeadlineCalendar={onHandleSetDeadlineCalendar}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
