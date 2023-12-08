import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

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
    // user available
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);
  console.log("ali", loggedInUser);
  return (
    <div className="bg-info d-flex justify-content-center align-items-center flex-column">
      <h1 className="text-light mt-3"> User Pannel </h1>
      <hr className="text-light bg-light p-1 w-100" />
      <h2 className="text-light mt-3">
        User : {loggedInUser ? loggedInUser.name : "No Data"} <br />
        Category : {loggedInUser ? loggedInUser?.category : "No Data"}
      </h2>
      <div className="d-flex flex-wrap px-3 mb-5 justify-content-center align-items-center">
        {bookings.map(
          (booking) =>
            loggedInUser?.category === booking.category && (
              // loggedInUser._id === booking.userId &&
              <Card
                key={booking._id}
                style={{ width: "20rem", margin: "20px" }}
                className="item-card"
              >
                <Card.Body>
                  <Card.Title>{booking.name}</Card.Title>
                  <Card.Text className="item-card-title">
                    <strong>From: </strong>
                    {booking.fromCountry}
                    <br />
                    <strong>To: </strong>
                    {booking.toCountry}
                    <br />
                    <strong>Description: </strong>
                    {booking.description}
                    <br />

                    <strong>From Date: </strong>
                    {new Date(booking.fromDate).toDateString()}
                    <br />
                    <strong>To Date: </strong>
                    {new Date(booking.toDate).toDateString()}
                    <br />

                    <strong>Category: </strong>
                    {booking?.category}
                    <br />
                  </Card.Text>
                </Card.Body>
              </Card>
            )
        )}
      </div>
    </div>
  );
}
