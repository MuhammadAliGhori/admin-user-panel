// userFormModel.js
const mongoose = require("mongoose");

const bookingModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    fromCountry: {
      type: String,
      required: true,
    },
    toCountry: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const UserForm = mongoose.model("bookingModel", bookingModel);

module.exports = UserForm;
