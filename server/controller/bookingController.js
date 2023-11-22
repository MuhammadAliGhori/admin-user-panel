const Booking = require("../model/bookingModel");

// Create a booking
const createBooking = async (req, res) => {
  try {
    const { userId, name, fromCountry, toCountry, description,  fromDate, toDate } = req.body;

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

module.exports = {
  createBooking,
  getAllBookings
};
