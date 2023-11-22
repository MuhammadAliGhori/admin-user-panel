import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    description: "",
    adminKey: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/createuser",
        formData
      );
      console.log("User created:", response.data);
      navigate("/userlogin");
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert(`There was an error creating the user. ${error.message}`);
    }
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <h1>User Sign Up</h1>
      <form className="w-50" onSubmit={handleSubmit}>
        <div className="form-group text-start">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <small className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group text-start mt-3">
          <label htmlFor="exampleInputName">Name </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            placeholder="Enter User Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your Name with anyone else.
          </small>
        </div>
        <div className="form-group text-start mt-3">
          <label htmlFor="exampleInputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group text-start mt-3">
          <label htmlFor="exampleInputDescripiton">Description </label>
          <input
            type="text"
            className="form-control"
            id="description"
            aria-describedby="descriptionHelp"
            placeholder="Enter User Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your description with anyone else.
          </small>
        </div>
        <div className="form-group text-start mt-3">
          <label htmlFor="exampleInputAdminKey">
            Add Admin Provided Credentials
          </label>
          <input
            type="text"
            className="form-control"
            id="adminKey"
            aria-describedby="AdminKey"
            placeholder="Enter Admin Key"
            value={formData.adminKey}
            onChange={handleInputChange}
          />
          <small id="AdminKey" className="form-text text-muted">
            We'll never share your Admin Key with anyone else.
          </small>
        </div>
        <button type="submit" className="btn btn-primary mt-3 w-100">
          Submit
        </button>
      </form>
    </div>
  );
}
