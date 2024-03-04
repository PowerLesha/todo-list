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
export const addTaskList = createAsyncThunk(
  "list/addTaskList",
  async ({ id, title, tasks }, thunkAPI) => {
    try {
      // Make a POST request to add the new list and its tasks to the mock API
      const response = await axios.post(`${baseURL}`, {
        id,
        title,
        tasks: [],
      });

      // Return the response data, including the  `todo`
      return response.data;
    } catch (error) {
      console.error("Error adding task list:", error);
      throw error;
    }
  }
);
const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    // Add task list action

    // Delete task list action
    deleteTaskList(state, action) {
      const { listId, todo } = action.payload;
      state.taskLists = state.taskLists.filter((list) => list.todo !== todo);

      mockApiService.deleteTaskList(listId, todo);
    },

    // Update task title action
    updateTaskTitle(state, action) {
      // Update task title in Redux state only, no need to update in mock API
      const { id, todo, title, tasks, editingTaskId } = action.payload;
      const listToUpdate = state.taskLists.find((list) => list.todo === todo);
      const index = state.taskLists.findIndex((list) => list.id === id);
      // const taskToUpdateIndex = state.taskLists[index].tasks.findIndex(
      //   (task) => task.id === editingTaskId
      // );
      // state.taskLists[index].tasks[taskToUpdateIndex].title = title;

      if (listToUpdate) {
        const updatedList = (state.taskLists[index] = {
          id: id,
          todo: todo,
          title: title,
          tasks: state.taskLists[index].tasks.map((task) =>
            task.id === editingTaskId ? { ...task, title: tasks.title } : task
          ), // Add the new task
        });
        state.taskLists[index] = updatedList;

        mockApiService.updateTaskTitle(todo, updatedList);
      }
    },

    // Update task list title action
    updateTaskListTitle(state, action) {
      const { todo, title } = action.payload;
      const listToUpdate = state.taskLists.find((list) => list.todo === todo);
      if (listToUpdate) {
        listToUpdate.title = title;
        mockApiService.updateTaskListTitle(todo, title);
      }
    },

    // Add one task action

    addOneTask(state, action) {
      const { id, todo, title, tasks } = action.payload;

      // Find the index of the list to update
      const index = state.taskLists.findIndex((list) => list.id === id);

      if (index !== -1) {
        // Update the list with new data including the new task
        const updatedList = (state.taskLists[index] = {
          id: id,
          todo: todo,
          title: title,
          tasks: [...state.taskLists[index].tasks, tasks], // Add the new task
        });

        // Make a POST request to add the new task to the mock API
        mockApiService.addOneTask(todo, updatedList);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLists.fulfilled, (state, action) => {
        console.log("Payload:", action.payload); // Log the payload received
        state.taskLists = action.payload;
      })
      .addCase(getAllLists.rejected, (state, action) => {
        console.error("Error fetching lists:", action.error);
      })
      .addCase(addTaskList.fulfilled, (state, action) => {
        state.taskLists.push(action.payload); // Add the new list to taskLists
      })
      .addCase(addTaskList.rejected, (state, action) => {
        state.error = action.error.message; // Store error message
      });
  },
});

export const {
  deleteTaskList,
  updateTaskTitle,
  updateTaskListTitle,
  addOneTask,
  deleteOneTask,

  updateTaskStatus,
} = listSlice.actions;

export const selectTaskLists = (state) => state.lists.taskLists;

export default listSlice.reducer;
