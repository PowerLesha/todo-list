// MockApiService.js

import axios from "axios";

const baseURL = "https://64ef0d31219b3e2873c3ddd0.mockapi.io/app/todo";

const mockApiService = {
  // Function to add a task list and its tasks
  addTaskList: async (newList) => {
    try {
      await axios.post(`${baseURL}`, newList);
    } catch (error) {
      console.error("Error adding task list:", error);
      throw error;
    }
  },
  // Other functions omitted for brevity
  addOneTask: async (listId, newTask) => {
    try {
      await axios.post(`${baseURL}`, newTask);
    } catch (error) {
      console.error("Error adding task to list:", error);
      throw error;
    }
  },
};

export default mockApiService;
