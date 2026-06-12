import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });

    localStorage.setItem("token", response.data.token);

    alert("Login Successful");
  };

  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>

      <input
        className="form-control mb-3"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={login}>
        Login
      </button>
    </div>
  );
}

export default Login;
