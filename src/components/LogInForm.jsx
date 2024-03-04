import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleUsernameChange = (e) => {
    const input = e.target.value;
    setUsername(input);
    if (input.length < 4) {
      setUsernameError("Username must be at least 4 characters long.");
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    if (input.length < 4) {
      setPasswordError("Password must be at least 4 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usernameError || passwordError || !username || !password) {
      alert("Please correct the errors before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to login");

      login(data.token, { username });
      alert("Login Successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login Failed: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div>
        <div className="text-center mb-8">
          <span className="text-6xl" style={{ color: "#F1C40E" }}>
            Believe Yourself
          </span>
          <div className="text-black text-2xl mt-2">Train like a pro</div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white rounded-lg shadow-md min-w-full sm:min-w-0 sm:w-96"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            Login with your credentials
          </h2>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {usernameError && (
              <p className="text-red-500 text-xs italic">{usernameError}</p>
            )}
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            {passwordError && (
              <p className="text-red-500 text-xs italic">{passwordError}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
