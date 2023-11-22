import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function AdminPanel() {
  const [bookings, setBookings] = useState([]);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editedBookingData, setEditedBookingData] = useState({});
  const correctAdminKey = process.env.BOOKING_FORM_KEY;

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

  return (
    <div
      className="bg-info d-flex justify-content-center align-items-center flex-column"
      style={{ height: "80vh" }}
    >
      <h1 className="text-light">Booking Forms of Consumers</h1>
      <div className="d-flex mt-3">
        {bookings.map((booking) => (
          <div key={booking._id}>
            <div>
              {editingBookingId === booking._id ? (
                <Card
                  style={{
                    height: "300px",
                    maxWidth: "300px",
                    width: "100%",
                    overflow: "scroll",
                  }}
                >
                  <Card.Body>
                    <form onSubmit={(e) => handleSubmit(e, booking._id)}>
                      <button
                        type="submit"
                        className="btn btn-primary mt-3 w-100"
                      >
                        Save Changes
                      </button>
                      <div className="form-group text-start mt-3">
                        <label htmlFor="exampleInputName">Name</label>
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
                <Card style={{ width: "18rem", margin: "20px" }}>
                  <Card.Body>
                    <div className="text-end">
                      {correctAdminKey === booking.adminKey ? (
                        <div className="">
                          <Button className="bg-danger border-0 mx-2">
                            Delete
                          </Button>
                          <Button
                            className="bg-success border-0"
                            onClick={() => setEditingBookingId(booking._id)}
                          >
                            Edit
                          </Button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <Card.Title className="mt-3">{booking.name}</Card.Title>
                    <Card.Text>
                      <strong>From: </strong>
                      {booking.fromCountry}
                      <br />
                      <strong>To: </strong>
                      {booking.toCountry}
                      <br />
                      <strong>Description: </strong>
                      <p
                        className="mb-0"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {booking.description}
                      </p>
                      <strong>From Date: </strong>
                      {new Date(booking.fromDate).toDateString()}
                      <br />
                      <strong>To Date: </strong>
                      {new Date(booking.toDate).toDateString()}
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
