import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./custom.css";
import axios from "axios";

export default function User() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkme, setCheckMe] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!checkme) {
        alert("Please check the box to proceed.");
        return;
      }
      const response = await axios.post(
        "http://localhost:8000/api/adminlogin",
        {
          email,
          password,
        }
      );

      if (response.status === 201) {
        console.log("Admin created successfully:", response.data.user);
        navigate("/adminpanel");
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center pt-5">
      <h1>Admin Pannel</h1>
      <form className="w-50" onSubmit={handleSubmit}>
        <div className="form-group text-start">
          <label for="exampleInputEmail1">Email address</label>
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
          <label for="exampleInputPassword1 w-100 text-start">Password</label>
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
            value={checkme}
            onChange={() => setCheckMe(true)}
          />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="custom-btn btn-9 mt-3 w-100">
          Submit
        </button>
      </form>
    </div>
  );
}
