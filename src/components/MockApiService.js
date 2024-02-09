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
  addOneTask: async (listId, task) => {
    try {
      // Fetch the current list data
      const response = await axios.get(`${baseURL}`);
      const updatedListIndex = response.data.findIndex(
        (list) => list.id === listId
      );

      const updatedList = response.data[updatedListIndex];
      // Update the tasks array of the current list
      updatedList.tasks = updatedList.tasks
        ? [...updatedList.tasks, task]
        : [task];

      // Update the entire data with the new task added
      await axios.put(`${baseURL}/${updatedListIndex + 1}`, updatedList);
    } catch (error) {
      console.error("Error adding task to list:", error);
      throw error;
    }
  },
};

export default mockApiService;
