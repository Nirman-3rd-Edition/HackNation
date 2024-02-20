const User = require("../Models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const userkey = user._id;

    if (email === user.email && password === user.password) {
      req.session.email = email;
      req.session.success = true;
      req.session.userkey = userkey;
      //   console.log(req.session.email);
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ firstname, lastname, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

module.exports.userdetails = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });

  try {
    res.json({ user });
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};

module.exports.getuser = async (req, res) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    // Decode the token and extract the user ID
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.userId;

    res.json({ userId });
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(401).send("Unauthorized");
  }
};

// module.exports.getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.find({ _id: { $ne: req.params.id } }).select([
//       "email",
//       "firstname",
//       "avatarImage",
//       "_id",
//     ]);
//     return res.json(users);
//   } catch (ex) {
//     next(ex);
//   }
// };

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
