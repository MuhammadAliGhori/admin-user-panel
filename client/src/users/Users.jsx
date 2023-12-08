import React, { useEffect, useState } from "react";
import axios from "axios";
import "./custom.css";
import { useNavigate } from "react-router-dom";
import BookingTable from "./BookingTable";

export default function Users() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    description: "",
    category: "",
    status: "",
    adminKey: "",
  });
  const correctAdminKey = process.env.BOOKING_FORM_KEY;
  const [bookings, setBookings] = useState([]);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editedBookingData, setEditedBookingData] = useState({});
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getallbookings"
        );
        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
    fetchBookings();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/updatebooking/${id}`,
        editedBookingData
      );
      console.log("Booking updated:", response.data);
      setEditingBookingId(null);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleInputChange1 = (e, field) => {
    const { value } = e.target;
    setEditedBookingData({ ...editedBookingData, [field]: value });
  };

  const handleSubmit1 = (e, id) => {
    e.preventDefault();
    handleEdit(id);
  };

  // delete booking
  const handleDelete1 = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/deletebooking/${id}`
      );
      console.log("Booking deleted:", response.data);
      setBookings(bookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // All users
  // Inside useEffect to fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getallusers"
        );
        if (response.status === 200) {
          setUsers(response.data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Edit User
  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    setEditingUserId(userId);
    setEditedUserData({ ...userToEdit });
    setShowModal(true);
  };
  const handleUpdateUser = async (userId) => {
    try {
      const adminKey = "ali@@&&**786";
      const response = await axios.put(
        `http://localhost:8000/api/updateuser/${userId}`,
        editedUserData,
        {
          headers: {
            "Admin-Key": adminKey,
          },
        }
      );
      console.log("User updated:", response.data);

      setEditingUserId(null);
      setEditedUserData({});
      setShowModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
      // setShowModal(false);
    }
  };

  // delete User
  const handleDeleteUser = async (userId) => {
    try {
      const adminKey = "ali@@&&**786";
      const response = await axios.delete(
        `http://localhost:8000/api/deleteUser/${userId}`,
        {
          data: { adminKey },
        }
      );

      console.log("User deleted:", response.data);

      // Update the state by filtering out the deleted user
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUserId(null);
    setEditedUserData({});
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/createuser",
  //       formData
  //     );
  //     console.log("User created:", response.data);
  //     navigate("/userlogin");
  //   } catch (error) {
  //     console.error("Error creating user:", error.message);
  //     alert(`There was an error creating the user. ${error.message}`);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let dataToSend = { ...formData };

      const adminKey = "ali@@&&**786";
      dataToSend = adminKey ? { ...dataToSend, adminKey } : { ...dataToSend };

      const response = await axios.post(
        "http://localhost:8000/api/createuser",
        dataToSend
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

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: selectedCategory,
    }));
  };

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      status: selectedStatus,
    }));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <h1>Create A User</h1>
      <form className="w-100 px-5" onSubmit={handleSubmit}>
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
          <label htmlFor="categoryDropdown">Category</label>
          <select
            className="form-control"
            id="categoryDropdown"
            value={formData.category}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            <option value="education">Education</option>
            <option value="engineering">Engineering</option>
            <option value="medical">Medical</option>
          </select>
        </div>
        <div className="form-group text-start mt-3">
          <label htmlFor="exampleInputStatus">Status</label>
          <select
            className="form-control"
            id="status"
            value={formData.status}
            onChange={handleStatusChange}
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="success">Success</option>
          </select>
        </div>
        <BookingTable
          bookings={bookings}
          users={users}
          handleDelete={handleDelete1}
          setEditingBookingId={setEditingBookingId}
          correctAdminKey={correctAdminKey}
        />
        {/* <div className="form-group text-start mt-3">
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
        </div> */}
        <button type="submit" className="custom-btn btn-9 mt-3 w-100">
          Submit
        </button>
      </form>
    </div>
  );
}
