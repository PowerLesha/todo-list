import React from "react";
import axios from "axios";

const MockApiTrigger = () => {
  const handleTriggerPutRequest = () => {
    const endpoint = "https://64ef0d31219b3e2873c3ddd0.mockapi.io/app/todo";

    // Data to be sent in the request body
    const requestData = {
      taskLists: [
        {
          id: "84ac174c-6d69-4a0c-b2e4-fcc7fff28a1b",
          title: "gt",
          tasks: [
            {
              id: "e844bfdf-1dcb-4da6-93e5-16f59c5a8daf",
              title: "jn",
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
        console.log("POSt request successful");
        console.log(response.data); // Log response data if needed
      })
      .catch((error) => {
        // Handle error
        console.error("Error making PUT request:", error);
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
