// listSlice.js

import { createSlice } from "@reduxjs/toolkit";
import mockApiService from "../../components/MockApiService.js";

const initialState = {
  taskLists: [],
};

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
        }
      }
    },

    // Update task list title action
    updateTaskListTitle(state, action) {
      const { listId, title } = action.payload;
      const listToUpdate = state.taskLists.find((list) => list.id === listId);
      if (listToUpdate) {
        listToUpdate.title = title;
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
  },
});

export const {
  addTaskList,
  deleteTaskList,
  updateTaskTitle,
  updateTaskListTitle,
  addOneTask,
  deleteOneTask,
} = listSlice.actions;

export const selectTaskLists = (state) => state.lists.taskLists;

export default listSlice.reducer;
