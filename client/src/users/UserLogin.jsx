import React, { useState } from "react";
import "./custom.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkme, setCheckMe] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!checkme) {
        setError("Please check the box to proceed.");
        return;
      }

      const response = await axios.post("http://localhost:8000/api/userlogin", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("User logged in successfully:", response.data.user);
        localStorage.setItem('loggedInUser', JSON.stringify(response.data.user));
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Error during login");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <h1>User Login</h1>
      <form className="w-50" onSubmit={handleSubmit}>
        <div className="form-group text-start">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group text-start mt-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group form-check text-start mt-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            checked={checkme}
            onChange={(e) => setCheckMe(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        {error && <div className="text-danger">{error}</div>}
        <button type="submit" className="custom-btn btn-9 mt-3 w-100">
          Submit
        </button>
      </form>
    </div>
  );
}
