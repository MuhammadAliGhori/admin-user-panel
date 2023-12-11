import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import "./custom.css";
import { useTable, useFilters } from "react-table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import BookingTable from "./BookingTable";
import Table from "../Table";

export default function AdminPanel() {
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

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditedBookingData({ ...editedBookingData, [field]: value });
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    handleEdit(id);
  };

  // delete booking
  const handleDelete = async (id) => {
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

  // react table

  const data = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    // Add more data as needed
  ];

  return (
    <div className="mmbox d-flex justify-content-center align-items-center flex-column pb-5">
      <div className="d-flex w-100 px-5 mt-5">
        <h3 className="text-dark w-50 ">Booking Forms of Consumers</h3>

        <Dropdown className="w-50">
          <Dropdown.Toggle
            className="w-100 text-center"
            variant="secondary"
            id="dropdown-basic"
          >
            Users List
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100">
            {users.map((user) => (
              <div className="d-flex justify-content-between mb-2 px-2">
                <Dropdown.Item key={user._id}>
                  {user.name} - {user.email} - {user.category}
                </Dropdown.Item>
                <Button
                  className="custom-btn btn-9 border-0 mx-3"
                  onClick={() => handleEditUser(user._id)}
                >
                  Edit
                </Button>
                <Button
                  className="custom-btn btn-9 border-0"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </Dropdown.Menu>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
              <input
                type="text"
                value={editedUserData.email || ""}
                onChange={(e) =>
                  setEditedUserData({
                    ...editedUserData,
                    email: e.target.value,
                  })
                }
                placeholder="Enter Email"
                className="w-100"
              />
              <br />
              <input
                type="text"
                value={editedUserData.name || ""}
                onChange={(e) =>
                  setEditedUserData({ ...editedUserData, name: e.target.value })
                }
                placeholder="Enter Name"
                className="w-100"
              />
              <br />
              <input
                type="password"
                value={editedUserData.password || ""}
                onChange={(e) =>
                  setEditedUserData({
                    ...editedUserData,
                    password: e.target.value,
                  })
                }
                placeholder="Enter Password"
                className="w-100"
              />
              <br />
              <input
                type="text"
                value={editedUserData.description || ""}
                onChange={(e) =>
                  setEditedUserData({
                    ...editedUserData,
                    description: e.target.value,
                  })
                }
                placeholder="Enter Description"
                className="w-100"
              />
              <br />
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="custom-btn btn-9"
                onClick={() => handleUpdateUser(editingUserId)}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </Dropdown>
      </div>
      <div className="d-flex justify-content-start w-100 px-5">
        <button className="custom-btn  btn-9 mt-3">
          <Link
            to="/createuser"
            className=" text-decoration-none text-light fw-bold"
          >
            Create User
          </Link>
        </button>
      </div>
      <h1 className="mt-3">All Leads</h1>
      <div className="d-flex flex-wrap justify-content-between px-0 mt-3 position-relative">
        <BookingTable
          bookings={bookings}
          users={users}
          handleDelete={handleDelete}
          setEditingBookingId={setEditingBookingId}
          correctAdminKey={correctAdminKey}
        />

        {bookings.map((booking) => (
          <div className="position-absolute w-50" key={booking._id}>
            <div className="">
              {editingBookingId === booking._id ? (
                <Card
                  style={{
                    height: "300px",
                    maxWidth: "100%",
                    width: "100%",
                    overflow: "scroll",
                  }}
                  className="item-card"
                >
                  <Card.Body className="">
                    <form onSubmit={(e) => handleSubmit(e, booking._id)}>
                      <button
                        type="submit"
                        className="custom-btn btn-9 mt-3 w-100"
                      >
                        Save Changes
                      </button>
                      <div className="form-group text-start mt-3">
                        <label
                          htmlFor="exampleInputName"
                          className="item-card-title"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Enter Name"
                          value={editedBookingData.name || booking.name}
                          onChange={(e) => handleInputChange(e, "name")}
                        />
                      </div>
                      <div className="form-group text-start mt-3">
                        <label htmlFor="exampleInputFromCountry">
                          From Country
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="fromCountry"
                          placeholder="Enter From Country"
                          value={
                            editedBookingData.fromCountry || booking.fromCountry
                          }
                          onChange={(e) => handleInputChange(e, "fromCountry")}
                        />
                      </div>
                      <div className="form-group text-start mt-3">
                        <label htmlFor="exampleInputFromCountry">
                          From Country
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="fromCountry"
                          placeholder="Enter From Country"
                          value={
                            editedBookingData.fromCountry || booking.fromCountry
                          }
                          onChange={(e) => handleInputChange(e, "fromCountry")}
                        />
                      </div>
                      <div className="form-group text-start mt-3">
                        <label htmlFor="exampleInputToCountry">
                          To Country
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="toCountry"
                          placeholder="Enter To Country"
                          value={
                            editedBookingData.toCountry || booking.toCountry
                          }
                          onChange={(e) => handleInputChange(e, "toCountry")}
                        />
                      </div>
                      <div className="form-group text-start mt-3">
                        <label htmlFor="exampleInputDescription">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id="description"
                          placeholder="Enter Description"
                          value={
                            editedBookingData.description || booking.description
                          }
                          onChange={(e) => handleInputChange(e, "description")}
                        />
                      </div>
                      <div className="form-group text-start mt-3">
                        <label htmlFor="exampleInputFromDate">From Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="fromDate"
                          value={editedBookingData.fromDate || booking.fromDate}
                          onChange={(e) => handleInputChange(e, "fromDate")}
                        />
                      </div>
                      <div className="form-group text-start mt-3">
                        <label htmlFor="exampleInputToDate">To Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="toDate"
                          value={editedBookingData.toDate || booking.toDate}
                          onChange={(e) => handleInputChange(e, "toDate")}
                        />
                      </div>
                    </form>
                  </Card.Body>
                </Card>
              ) : (
                <>
                  {
                    users.some((user) => user._id === booking.userId) && ""
                    // <Card
                    //   style={{ width: "20rem", margin: "20px" }}
                    //   className="item-card"
                    // >
                    //   <Card.Body>
                    //     <div className="text-end">
                    //       {correctAdminKey === booking.adminKey ? (
                    //         <div className="">
                    //           <button
                    //             className="custom-btn btn-9 border-0 mx-2"
                    //             onClick={() => handleDelete(booking._id)}
                    //           >
                    //             Delete
                    //           </button>
                    //           <button
                    //             className="custom-btn btn-9 border-0"
                    //             onClick={() => setEditingBookingId(booking._id)}
                    //           >
                    //             Edit
                    //           </button>
                    //         </div>
                    //       ) : (
                    //         ""
                    //       )}
                    //     </div>

                    //     {/* User name */}
                    //     <div className="d-flex align-items-center mt-3 gap-2">
                    //       <strong>User: </strong>
                    //       <h3 className="bold w-100">
                    //         {users.map((user) => {
                    //           if (user._id === booking.userId) {
                    //             return `${user.name}`;
                    //           }
                    //           return null;
                    //         })}
                    //       </h3>
                    //     </div>
                    //     <Card.Title className="mt-3">
                    //       <strong>Consumer :</strong> <space />
                    //       <space />
                    //       {booking.name}
                    //     </Card.Title>
                    //     <Card.Text>
                    //       <strong>From: </strong>
                    //       {booking.fromCountry}
                    //       <br />
                    //       <strong>To: </strong>
                    //       {booking.toCountry}
                    //       <br />
                    //       <strong>Description: </strong>
                    //       <p
                    //         className="mb-0"
                    //         style={{
                    //           display: "-webkit-box",
                    //           WebkitLineClamp: 1,
                    //           WebkitBoxOrient: "vertical",
                    //           overflow: "hidden",
                    //           textOverflow: "ellipsis",
                    //         }}
                    //       >
                    //         {booking.description}
                    //       </p>
                    //       <strong>From Date: </strong>
                    //       {new Date(booking.fromDate).toDateString()}
                    //       <br />
                    //       <strong>To Date: </strong>
                    //       {new Date(booking.toDate).toDateString()}
                    //     </Card.Text>
                    //   </Card.Body>
                    // </Card>
                  }
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <h1 className="py-3">Assigned the Leads</h1>
      <Table
        data={bookings}
        handleEdit={() => handleEdit()}
        handleDelete={handleDelete}
        users={users}
        setEditingBookingId={setEditingBookingId}
        correctAdminKey={correctAdminKey}
      />
    </div>
  );
}
