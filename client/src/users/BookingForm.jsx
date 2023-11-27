import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./custom.css"

function BookingForm() {
  const { userId } = useParams();
  const navigate = useNavigate();
  console.log(userId, "ali");
  const [userDetails, setUserDetails] = useState(null);
  const [formData, setFormData] = useState({
    userId: userId,
    name: "",
    fromCountry: "",
    toCountry: "",
    description: "",
    fromDate: "",
    toDate: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/createbooking",
        formData
      );

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/getallusers/${userId}`
        );
        if (response.status === 200) {
          setUserDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-5 pb-5">
      {/* <p>User ID: {userDetails.user._id}</p> */}
      <div className="d-flex flex-column justify-content-center align-items-center py-5">
        <h2 className="bold">Name: {userDetails.user.name}</h2>
        <h2 className="bold">Email: {userDetails.user.email}</h2>
        <form className="w-50" onSubmit={handleSubmit}>
          <div className="form-group text-start mt-3">
            <label htmlFor="exampleInputName">Name </label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="nameHelp"
              placeholder="Enter User Name"
              value={formData.name}
              onChange={handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your Name with anyone else.
            </small>
          </div>
          <div className="form-group text-start mt-3">
            <label htmlFor="exampleInputFromCountry">From Country</label>
            <input
              type="text"
              className="form-control"
              id="fromCountry"
              placeholder="From Country"
              value={formData.fromCountry}
              onChange={handleChange}
            />
          </div>

          <div className="form-group text-start mt-3">
            <label htmlFor="exampleInputToCountry">To Country</label>
            <input
              type="text"
              className="form-control"
              id="toCountry"
              placeholder="To Country"
              value={formData.toCountry}
              onChange={handleChange}
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
              onChange={handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your description with anyone else.
            </small>
          </div>
          <div className="form-group text-start mt-3">
            <label htmlFor="exampleInputFromDate">From Date </label>
            <input
              type="date"
              className="form-control"
              id="fromDate"
              aria-describedby="fromDateHelp"
              value={formData.fromDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group text-start mt-3">
            <label htmlFor="exampleInputToDate">To Date </label>
            <input
              type="date"
              className="form-control"
              id="toDate"
              aria-describedby="toDateHelp"
              value={formData.toDate}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="custom-btn btn-9 mt-3 w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
