// Booking
const express = require("express");
const router = express.Router();

const bookingController = require("../controller/bookingController");

// create
router.post("/createbooking", bookingController.createBooking);

// get all
router.get("/getallbookings", bookingController.getAllBookings);

// update
router.put("/updatebooking/:id", bookingController.editBooking);

// delete
router.delete("/deletebooking/:id", bookingController.deleteBooking);

// delete

module.exports = router;
