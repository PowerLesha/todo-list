import React, { useState } from "react";
import axios from "axios";
import SignIn from "./SingnIn";

function Login({ onLoginSuccess }) {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:5005/signup", {
        username,
        password,
        email,
      });
      console.log(response.data);
      setErrors([]); // Clear errors on success
      setUsername("");
      setPassword("");
      setEmail("");
      // Redirect to dashboard or authenticated route if needed
    } catch (error) {
      console.error("Error response:", error.response?.data); // Log the error response
      setErrors(error.response?.data?.errors || ["An error occurred"]);
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
      setErrors("");
      onLoginSuccess(); // Call onLoginSuccess function upon successful login
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrors(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div style={{ width: "500px" }}>
      <SignIn
        handleSignIn={handleSignIn}
        handleSignUp={handleSignUp}
        setPassword={setPassword}
        setUsername={setUsername}
        setEmail={setEmail}
        email={email}
        password={password}
        username={username}
        error={errors}
      />
    </div>
  );
}

export default Login;
