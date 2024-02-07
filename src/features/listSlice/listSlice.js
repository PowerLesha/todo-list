import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskLists: [],
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    // addTaskList(state, action) {
    //   const newList = {
    //     id: action.payload,
    //     title: action.payload,
    //     tasks: [{}],
    //   };
    //   state.taskLists.push(newList);
    // },
    addTaskList(state, action) {
      const { id, title } = action.payload;
      const newList = {
        id: action.payload.id,
        title: action.payload.title,
        tasks: [],
      };
      state.taskLists.push(newList);
    },
    deleteTaskList(state, action) {
      state.taskLists = state.taskLists.filter(
        (list) => list.id !== action.payload
      );
    },
    updateTaskTitle(state, action) {
      const { listId, taskId, title } = action.payload;
      const listToUpdate = state.taskLists.find((list) => list.id === listId);
      if (listToUpdate) {
        // Find the task within the list and update its title
        const updatedTasks = listToUpdate.tasks.map((task) =>
          task.id === taskId ? { ...task, title } : task
        );
        // Update the task list with the updated tasks
        const updatedList = { ...listToUpdate, tasks: updatedTasks };
        // Return the updated state with the modified list
        return {
          ...state,
          taskLists: state.taskLists.map((list) =>
            list.id === listId ? updatedList : list
          ),
        };
      }
      return state; // Return the unchanged state if listToUpdate is not found
    },
    updateTaskListTitle(state, action) {
      const listToUpdate = state.taskLists.find(
        (list) => list.id === action.payload.id
      );
      if (listToUpdate) {
        listToUpdate.title = action.payload.title;
      }
    },
    addOneTask(state, action) {
      const list = state.taskLists.find(
        (list) => list.id === action.payload.listId
      );
      if (list) {
        list.tasks.push(action.payload.task);
      }
    },
    deleteTask(state, action) {
      const list = state.taskLists.find(
        (list) => list.id === action.payload.listId
      );
      if (list) {
        list.tasks = list.tasks.filter(
          (task) => task.id !== action.payload.taskId
        );
      }
    },
    updateTaskStatus(state, action) {
      const list = state.taskLists.find(
        (list) => list.id === action.payload.listId
      );
      if (list) {
        const task = list.tasks.find(
          (task) => task.id === action.payload.taskId
        );
        if (task) {
          task.isDone = action.payload.isDone;
        }
      }
    },
  },
});

export const {
  addTaskList,
  deleteTaskList,
  updateTaskTitle,
  addOneTask,
  deleteTask,
  updateTaskStatus,
  updateTaskListTitle,
} = listSlice.actions;

export const selectTaskLists = (state) => state.list.taskLists;

export default listSlice.reducer;
