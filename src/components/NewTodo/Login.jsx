import React, { useState } from "react";
import axios from "axios";
import SignIn from "./SingnIn";

function Login({ onLoginSuccess }) {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:5005/signup", {
        username,
        password,
      });
      console.log(response.data);
      setError("");
      // Redirect to dashboard or authenticated route if needed
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:5005/signin", {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token); // Store token in local storage
      setError("");
      onLoginSuccess(); // Call onLoginSuccess function upon successful login
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div style={{ width: "500px" }}>
      <SignIn
        handleSignIn={handleSignIn}
        handleSignUp={handleSignUp}
        setPassword={setPassword}
        setUsername={setUsername}
        password={password}
        username={username}
        error={error}
      />
    </div>
  );
}

export default Login;
