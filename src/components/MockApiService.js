// MockApiService.js

import axios from "axios";

export const baseURL = "https://64ef0d31219b3e2873c3ddd0.mockapi.io/app/todo";

const mockApiService = {
  // Function to add a task list and its tasks

  getAllTasks: async () => {
    try {
      const response = await axios.get(`${baseURL}`);
      return console.log(response.data), response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },
  addTaskList: async (newList) => {
    try {
      await axios.post(`${baseURL}`, newList);
    } catch (error) {
      console.error("Error adding task list:", error);
      throw error;
    }
  },
  updateTaskListTitle: async (listId, title) => {
    try {
      // Fetch the current list data
      const response = await axios.get(`${baseURL}`);
      const updatedListIndex = response.data.findIndex(
        (list) => list.id === listId
      );
      const indexParam = response.data[updatedListIndex].todo;
      let updatedList = response.data[updatedListIndex];
      // Update the tasks array of the current list
      updatedList.title = title;
      // Update the entire data with the new list title
      await axios.put(`${baseURL}/${indexParam}`, updatedList);
    } catch (error) {
      console.error("Error updating task list title:", error);
      throw error;
    }
  },
  updateTaskTitle: async (listId, taskId, title) => {
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
        updatedList.tasks[updatedTaskIndex].title = title;

        // Update the entire data with the new list title
        await axios.put(`${baseURL}/${indexParam}`, updatedList);
      } else {
        console.error("Task not found");
      }
    } catch (error) {
      console.error("Error updating task list title:", error);
      throw error;
    }
  },
  deleteTaskList: async (listId, list) => {
    try {
      // Fetch the current list data
      const response = await axios.get(`${baseURL}`);
      const updatedListIndex = response.data.findIndex(
        (list) => list.id === listId
      );
      const indexParam = response.data[updatedListIndex].todo;
      const updatedList = response.data[updatedListIndex];
      // Update the tasks array of the current list
      updatedList.tasks = updatedList.tasks
        ? [...updatedList.tasks, list]
        : [list];
      await axios.delete(`${baseURL}/${indexParam}`);
    } catch (error) {
      console.error("Error deleting task list:", error);
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
      const indexParam = response.data[updatedListIndex].todo;
      console.log(response.data[updatedListIndex].todo);
      const updatedList = response.data[updatedListIndex];
      // Update the tasks array of the current list
      updatedList.tasks = updatedList.tasks
        ? [...updatedList.tasks, task]
        : [task];

      // Update the entire data with the new task added
      await axios.put(`${baseURL}/${indexParam}`, updatedList);
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
