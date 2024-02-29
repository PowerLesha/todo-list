import React, { useState } from "react";
import axios from "axios";
import SignIn from "./SingnIn";

function Login({ onLoginSuccess }) {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:5005/signup", {
        username,
        password,
        confirmPassword,
        email,
      });
      console.log(response.data);
      setErrors([]); // Clear errors on success
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setEmail("");
      setSignedUp(true);
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
      onLoginSuccess(username); // Call onLoginSuccess function upon successful login
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrors(error.response?.data?.errors || "An error occurred");
    }
  };

  return (
    <div
      style={{
        width: "500px",
        height: "650px",
        marginLeft: "250px",
      }}
    >
      <SignIn
        handleSignIn={handleSignIn}
        handleSignUp={handleSignUp}
        setPassword={setPassword}
        setUsername={setUsername}
        setEmail={setEmail}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        username={username}
        error={errors}
        signedUp={signedUp}
      />
    </div>
  );
}

export default Login;
