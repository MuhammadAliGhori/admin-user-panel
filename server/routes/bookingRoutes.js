// Booking
const express = require("express");
const router = express.Router();

const bookingController = require("../controller/bookingController");

router.post("/createbooking", bookingController.createBooking);

router.get("/getallbookings", bookingController.getAllBookings);


module.exports = router;
