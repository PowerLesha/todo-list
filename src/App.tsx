import { useEffect, useState } from "react";
import "./App.css";
import TodoList, { TaksType } from "./TodoList";
import { v4 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { CiCircleList } from "react-icons/ci";
import DateComponent from "./DateComponent";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaksType>;
};
function App() {
  function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
    let tasks = task[todolistId];
    let tasker = tasks.find((t) => t.id === id);
    if (tasker) {
      tasker.isDone = isDone;
    }

    setTask({ ...task });
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
      { id: v4(), title: "blabla", isDone: true },
      { id: v4(), title: "Html", isDone: true },
      { id: v4(), title: "gabascript", isDone: false },
      { id: v4(), title: "hahahah", isDone: true },
      { id: v4(), title: "hahahah", isDone: true },
    ],
    [todolistId2]: [
      { id: v4(), title: "book", isDone: true },
      { id: v4(), title: "coffee", isDone: false },
    ],
    [todolistId3]: [{ id: v4(), title: "smth", isDone: true }],
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
    console.log(savedTodoLists);
    console.log(savedTasks);
  }, []);
  const currentDate = new Date();
  return (
    <div>
      <div className="task-list">
        <h1>
          Add a new task list <CiCircleList />
        </h1>
        <div>
          <DateComponent />
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
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
