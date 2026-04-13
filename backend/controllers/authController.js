const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    let { name, username, email, mobile, password, birthdate } = req.body;

    // Trim inputs (very important)
    name = name?.trim();
    username = username?.trim();
    email = email?.trim();
    mobile = mobile?.trim();

    // 🔥 Basic validation
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Build query dynamically (avoid empty values)
    const query = [];

    if (email) query.push({ email });
    if (mobile) query.push({ mobile });
    if (username) query.push({ username });

    const userExists = await User.findOne({
      $or: query,
    });

    if (userExists) {
      // Better error message
      if (userExists.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
      if (userExists.username === username) {
        return res.status(400).json({ message: "Username already exists" });
      }
      if (mobile && userExists.mobile === mobile) {
        return res.status(400).json({ message: "Mobile already exists" });
      }

      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Convert empty mobile to null
    const finalMobile = mobile && mobile !== "" ? mobile : null;

    // Create user
    const user = await User.create({
      name,
      username,
      email,
      mobile: finalMobile,
      password: hashedPassword,
      birthdate,
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });

  } catch (error) {
    console.error(error); // for debugging
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // identifier = email OR mobile OR username
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { mobile: identifier },
        { username: identifier },
      ],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // token
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        name: user.name,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};