// MockApiService.js

import axios from "axios";

export const baseURL = "https://64ef0d31219b3e2873c3ddd0.mockapi.io/app/todo";

const mockApiService = {
  // Function to add a task list and its tasks

  updateTaskListTitle: async (todo, title) => {
    try {
      await axios.put(`${baseURL}/${todo}`, { title: title });
    } catch (error) {
      console.error("Error updating task list title:", error);
      throw error;
    }
  },
  updateTaskTitle: async (todo, taskId, taskTitle) => {
    try {
      // Update the entire data with the new list title
      await axios.put(`${baseURL}/${todo}`, { title: taskTitle });
    } catch (error) {
      console.error("Error updating task title:", error);
      throw error;
    }
  },
  updateTaskStatus: async (listId, taskId, isDone) => {
    try {
      // Fetch the current list data
      const response = await axios.get(`${baseURL}`);
      const updatedListIndex = response.data.findIndex(
        (list) => list.id === listId
      );
      const indexParam = response.data[updatedListIndex].todo;
      let updatedList = response.data[updatedListIndex];

      // updatedTask.title = title;
      const updatedTaskIndex = updatedList.tasks.findIndex(
        (task) => task.id === taskId
      );

      // If the task exists, update its title
      if (updatedTaskIndex !== -1) {
        updatedList.tasks[updatedTaskIndex].isDone = !isDone;

        // Update the entire data with the new list title
        await axios.put(`${baseURL}/${indexParam}`, updatedList);
      } else {
        console.error("Task not found");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      throw error;
    }
  },
  deleteTaskList: async (listId, todo) => {
    try {
      // Fetch the current list data

      await axios.delete(`${baseURL}/${todo}`);
    } catch (error) {
      console.error("Error deleting task list:", error);
      throw error;
    }
  },
  // Other functions omitted for brevity
  addOneTask: async (todo, updatedList) => {
    try {
      // Update the entire data with the new task added
      await axios.put(`${baseURL}/${todo}`, updatedList);
    } catch (error) {
      console.error("Error adding task to list:", error);
      throw error;
    }
  },
  deleteOneTask: async (listId, taskId) => {
    try {
      // Fetch the current list data
      const response = await axios.get(`${baseURL}`);
      const updatedListIndex = response.data.findIndex(
        (list) => list.id === listId
      );
      const indexParam = response.data[updatedListIndex].todo;
      const updatedList = response.data[updatedListIndex];
      // Update the tasks array of the current list
      updatedList.tasks = updatedList.tasks.filter(
        (task) => task.id !== taskId
      );
      // Update the entire data with the new task added
      await axios.put(`${baseURL}/${indexParam}`, updatedList);
    } catch (error) {
      console.error("Error adding task to list:", error);
      throw error;
    }
  },
};

export default mockApiService;
