// userFormController.js
const UserForm = require("../model/userFormModel");
const bcrypt = require("bcrypt");

// create  user
const createUserFrom = async (req, res) => {
  const { email, name, password, description, category, adminKey } = req.body;
  const correctAdminKey = "ali@@&&**786";
  try {
    const permissionGranted = true;
    if (permissionGranted) {
      if (adminKey !== correctAdminKey) {
        return res
          .status(401)
          .json({ message: "Unauthorized access of admin key" });
      }

      const existingUser = await UserForm.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUserForm = await UserForm.create({
        email,
        name,
        password: hashedPassword,
        description,
        category,
        adminKey,
      });
      return res.status(201).json({
        message: "User form submitted successfully",
        userForm: newUserForm,
      });
    } else {
      return res.status(401).json({ message: "Permission denied" });
    }
  } catch (error) {
    console.error("Error while submitting user form:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// login user
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await UserForm.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return res.status(200).json({ message: "Login successful", user });
    } else {
      return res.status(401).json({ message: "Password Invalid" });
    }
  } catch (error) {
    console.error("Error while logging in:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserForm.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error while fetching users:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// get one user
const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserForm.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error while fetching user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// edit user
const editUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const adminKey = req.headers["admin-key"];
    const correctAdminKey = "ali@@&&**786";

    if (adminKey !== correctAdminKey) {
      return res
        .status(401)
        .json({ message: "Unauthorized access of admin key" });
    }

    const { email, name, password, description, category } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUserData = {
      email,
      name,
      password: hashedPassword,
      description,
      category
    };

    const updatedUser = await UserForm.findByIdAndUpdate(
      userId,
      updatedUserData,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error while updating user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const adminKey = req.body.adminKey;
    console.log(adminKey, "ali");
    const correctAdminKey = "ali@@&&**786";

    if (adminKey !== correctAdminKey) {
      return res
        .status(401)
        .json({ message: "Unauthorized access of admin key" });
    }

    const deletedUser = await UserForm.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error while deleting user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createUserFrom,
  userLogin,
  getAllUsers,
  getSingleUser,
  editUser,
  deleteUser,
};
