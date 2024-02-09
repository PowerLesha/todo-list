import React from "react";
import axios from "axios";

const MockApiTrigger = () => {
  const handleTriggerPutRequest = () => {
    const endpoint = "https://64ef0d31219b3e2873c3ddd0.mockapi.io/app/todo";

    // Data to be sent in the request body
    const requestData = {
      id: "id 1",
      todo: "1",
      taskLists: [
        {
          id: "1fc1ac15-990a-4e41-8f95-3af05cebfe5e",
          title: "Lesha",
          tasks: [
            {
              id: "051d9e29-1a55-4b0c-885d-d53dd225ec27",
              title: "I am",
              isDone: false,
            },
          ],
        },
        {
          id: "0f4f5330-f876-42eb-9acd-b19c4408c370",
          title: "You are",
          tasks: [
            {
              id: "8e05be8d-80f9-47a0-9742-fb78d744d239",
              title: "rozbiynuk",
              isDone: false,
            },
          ],
        },
      ],
    };

    // Make the PUT request
    axios
      .post(endpoint, requestData)
      .then((response) => {
        // Handle success
        console.log("POST request successful");
        console.log(response.data); // Log response data if needed

        if (response.data) {
          const taskLists = response.data.taskLists;
          taskLists.forEach((taskList) => {
            const tasks = taskList.tasks;
            tasks.forEach((task) => {
              console.log(task.title); // Access task properties here
            });
          });
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error making POST request:", error);
      });
  };

  return (
    <div>
      <h2>Mock API Trigger</h2>
      <button onClick={handleTriggerPutRequest}>Trigger POST Request</button>
    </div>
  );
};

export default MockApiTrigger;
