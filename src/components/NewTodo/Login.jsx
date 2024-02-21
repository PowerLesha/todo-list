import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      console.log(response.data);
      setError("");
      // Redirect to dashboard or authenticated route if needed
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
