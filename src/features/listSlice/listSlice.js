// listSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockApiService, { baseURL } from "../../components/MockApiService.js";
import axios from "axios";

const initialState = {
  taskLists: [],
};
export const getAllLists = createAsyncThunk("list/getAllLists", async () => {
  try {
    const response = await axios.get(`${baseURL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
});

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    // Add task list action
    addTaskList(state, action) {
      const { id, title, tasks } = action.payload; // Extract tasks from payload
      const newList = {
        id,
        title,
        tasks: tasks || [], // Ensure tasks array is initialized
      };
      state.taskLists.push(newList);
      // console.log(newList.id);
      // Make a POST request to add the new list and its tasks to the mock API
      mockApiService.addTaskList(newList);
    },

    // Delete task list action
    deleteTaskList(state, action) {
      const { listId } = action.payload;
      state.taskLists = state.taskLists.filter((list) => list.id !== listId);
      mockApiService.deleteTaskList(listId);
    },

    // Update task title action
    updateTaskTitle(state, action) {
      // Update task title in Redux state only, no need to update in mock API
      const { listId, taskId, title } = action.payload;
      const listToUpdate = state.taskLists.find((list) => list.id === listId);
      if (listToUpdate) {
        const taskToUpdate = listToUpdate.tasks.find(
          (task) => task.id === taskId
        );
        if (taskToUpdate) {
          taskToUpdate.title = title;
          mockApiService.updateTaskTitle(listId, taskId, title);
        }
      }
    },

    // Update task list title action
    updateTaskListTitle(state, action) {
      const { listId, title } = action.payload;
      const listToUpdate = state.taskLists.find((list) => list.id === listId);
      if (listToUpdate) {
        listToUpdate.title = title;
        mockApiService.updateTaskListTitle(listId, title);
      }
    },

    // Add one task action

    addOneTask(state, action) {
      const { listId, task, index } = action.payload;

      const listToUpdate = state.taskLists.find((list) => list.id === listId);
      if (listToUpdate) {
        listToUpdate.tasks.push(task);
        // Make a POST request to add the new task to the mock API
        mockApiService.addOneTask(listId, task);
        // console.log(task.id);
      }
    },

    deleteOneTask(state, action) {
      const { listId, taskId } = action.payload;

      // Find the list in the state
      const listToUpdate = state.taskLists.find((list) => list.id === listId);

      if (listToUpdate) {
        // Filter out the task with the specified taskId
        listToUpdate.tasks = listToUpdate.tasks.filter(
          (task) => task.id !== taskId
        );
      }
      mockApiService.deleteOneTask(listId, taskId);
    },
    updateTaskStatus(state, action) {
      const { listId, taskId, isDone } = action.payload;
      const listToUpdate = state.taskLists.find((list) => list.id === listId);
      if (listToUpdate) {
        const taskToUpdate = listToUpdate.tasks.find(
          (task) => task.id === taskId
        );
        if (taskToUpdate) {
          taskToUpdate.isDone = !isDone;
          // mockApiService.updateTaskTitle(listId, taskId, title);
        }
      }
      mockApiService.updateTaskStatus(listId, taskId, isDone);
    },
    setTaskLists(state, action) {
      state.taskLists = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLists.fulfilled, (state, action) => {
        console.log("Payload:", action.payload); // Log the payload received
        state.taskLists = action.payload;
      })
      .addCase(getAllLists.rejected, (state, action) => {
        console.error("Error fetching lists:", action.error);
      });
  },
});

export const {
  addTaskList,
  deleteTaskList,
  updateTaskTitle,
  updateTaskListTitle,
  addOneTask,
  deleteOneTask,
  setTaskLists,
  updateTaskStatus,
} = listSlice.actions;

export const selectTaskLists = (state) => state.lists.taskLists;

export default listSlice.reducer;
