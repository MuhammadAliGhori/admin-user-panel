// userFormModel.js
const mongoose = require("mongoose");

const userFormSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    adminKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserForm = mongoose.model("UserForm", userFormSchema);

module.exports = UserForm;
