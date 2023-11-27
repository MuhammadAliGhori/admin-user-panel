import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function Home() {
  const [bookings, setBookings] = useState([]);

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
  return (
    <div className="bg-info d-flex justify-content-center align-items-center flex-column">
      <h1 className="text-light mt-3">Consumers Record </h1>
      <div className="d-flex flex-wrap px-3 justify-content-center align-items-center my-3">
        {bookings.map((booking) => (
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
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
