// userFormController.js
const UserForm = require('../model/userFormModel');
const bcrypt = require("bcrypt");


const createUserFrom = async (req, res) => {
  const { email, name, password, description } = req.body;

  try {
    const permissionGranted = true; 

    if (permissionGranted) {

        const hashedPassword = await bcrypt.hash(password, 10);

      const newUserForm = await UserForm.create({ email, name, password : hashedPassword , description });
      return res.status(201).json({ message: 'User form submitted successfully', userForm: newUserForm });
    } else {
      return res.status(401).json({ message: 'Permission denied' });
    }
  } catch (error) {
    console.error('Error while submitting user form:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createUserFrom,
};
