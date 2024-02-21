const Lsp = require("../Models/Lsp.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.lsplogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Lsp.findOne({ email });

    if (email === user.email && password === user.password) {
      req.session.email = email;
      req.session.success = true;
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const lsptoken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.json({ lsptoken, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

const requireAuth = (req, res, next) => {
  if (req.session.email) {
    next();
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

module.exports.lspregister = async (req, res, next) => {
  try {
    const { firstname, lastname, email, role, password, phoneno, fileid } =
      req.body;
    const existingUser = await Lsp.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Legal Service Provider already exists" });
    }

    const newUser = new Lsp({
      firstname,
      lastname,
      email,
      role,
      password,
      phoneno,
      fileid,
    });
    await newUser.save();

    res.status(201).json({ message: "LSP registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register" });
  }
};

module.exports.lsplist = async (req, res, next) => {
  const rolename = req.params.role;
  try {
    const data = await Lsp.find({ role: rolename });
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
};

module.exports.lspdetails = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await Lsp.findById(id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
};

module.exports.getlsp = async (req, res) => {
  const token = req.headers.lsptoken;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    // Decode the token and extract the user ID
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const lspId = decoded.userId;

    res.json({ lspId });
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(401).send("Unauthorized");
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await Lsp.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

// module.exports.setAvatar = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const avatarImage = req.body.image;
//     const userData = await User.findByIdAndUpdate(
//       userId,
//       {
//         isAvatarImageSet: true,
//         avatarImage,
//       },
//       { new: true }
//     );
//     return res.json({
//       isSet: userData.isAvatarImageSet,
//       image: userData.avatarImage,
//     });
//   } catch (ex) {
//     next(ex);
//   }
// };

// module.exports.logOut = (req, res, next) => {
//   try {
//     if (!req.params.id) return res.json({ msg: "User id is required " });
//     onlineUsers.delete(req.params.id);
//     return res.status(200).send();
//   } catch (ex) {
//     next(ex);
//   }
// };
