const bcrypt = require("bcrypt");
const User = require("./model/loginModel");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email === "ali@gmail.com" && password === "admin") {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({ email, password: hashedPassword });

      return res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during user creation:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
