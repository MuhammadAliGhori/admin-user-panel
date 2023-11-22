const Booking = require("../model/bookingModel");
require("dotenv").config();

const bookingFormKey = process.env.BOOKING_FORM_KEY;

// Create a booking
const createBooking = async (req, res) => {
  try {
    const {
      userId,
      name,
      fromCountry,
      toCountry,
      description,
      fromDate,
      toDate,
    } = req.body;

    // Create a new booking
    const newBooking = await Booking.create({
      userId,
      name,
      fromCountry,
      toCountry,
      description,
      fromDate,
      toDate,
    });

    return res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error while creating booking:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    return res.status(200).json({
      message: "All bookings retrieved successfully",
      bookings: bookings,
    });
  } catch (error) {
    console.error("Error while retrieving bookings:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Edit a booking by ID
const editBooking = async (req, res) => {
  try {
    const {
      userId,
      name,
      fromCountry,
      toCountry,
      description,
      fromDate,
      toDate,
    } = req.body;
    const bookingId = req.params.id;
    // const providedKey = req.headers["booking-form-key"];
    // if (providedKey !== bookingFormKey) {
    //   return res.status(403).json({ message: "Unauthorized access" });
    // }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        userId,
        name,
        fromCountry,
        toCountry,
        description,
        fromDate,
        toDate,
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error while updating booking:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  editBooking,
};
