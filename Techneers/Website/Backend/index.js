const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
// const notp = require("notp");
// const QRCode = require("qrcode");
const socket = require("socket.io");
const http = require("http");
const WebSocket = require("ws");

const authRoutes = require("./routes/auth.js");
const notification = require("./routes/noti.js");
const messageRoutes = require("./routes/messages.js");
const bookingRoutes = require("./routes/appointment.js");

const session = require("express-session");
const app = express();
app.use(cors());
// const PORT = 5000;
// const SECRET_KEY = "vivek";

// app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(
  session({
    secret: "mern",
    resave: false,
    saveUninitialized: true,
  })
);

//-----------------------------------------------------------------------------------------

//model Import

const Otp = require("./Models/Otp");
// const Notification = require("./Models/Notification");
const Casedetail = require("./Models/Casedetail");

//---------------------------------------------------------------------------------------

// Routes

app.use("/auth", authRoutes);
app.use("/noti", notification);
app.use("/messages", messageRoutes);
app.use("/book", bookingRoutes);

//session Checking

const requireAuth = (req, res, next) => {
  if (req.session.email) {
    next();
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

app.get("/user", requireAuth, (req, res) => {
  const email = req.session.email;
  res.json({ success: true, email });
});

//--------------------------------------------------------------------------------

//-------------------------------------------------------------

const upload = require("./controllers/Upload.js");

const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
});

const File = mongoose.model("File", fileSchema);

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const newFile = new File({
      filename: req.file.filename,
      path: req.file.path,
    });

    await newFile.save();

    res.status(201).send(newFile);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//----------------------------------------------------------------

//Mail send

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vivekranjansahoo81@gmail.com",
    pass: "xqpvlizmgfppoaww",
  },
});

// Function to send OTP via email
const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: "vivekranjansahoo81@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for email verification is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

app.post("/generateotp", async (req, res) => {
  const otpExpirationDuration = 5 * 60 * 1000;
  const { email } = req.body;

  await Otp.deleteMany({ email });

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpExpiration = new Date(Date.now() + otpExpirationDuration);

  // Save the user with email and OTP to the database
  await Otp.create({ email, otp, otpExpiration });

  // Send the OTP via email
  await sendOTP(email, otp);

  res.json({
    message: "Send succssfully. Check your email for OTP.",
  });
});

app.post("/verifyotp", async (req, res) => {
  const { email, otp } = req.body;

  // Find the user by email and OTP
  const user = await Otp.findOne({
    email,
    otp,
    otpExpiration: { $gt: new Date() },
  });

  if (user) {
    // Update user status or perform any additional actions
    res.json({ message: "OTP verification successful." });
  } else {
    res.status(400).json({ message: "Invalid OTP." });
  }
});

//------------------------------------------------------------------------

//----------------------------------------------------------------------

app.post("/acceptconnect/:userid", async (req, res) => {
  const { userid } = req.params;
  const { lspid, title, desc, accept } = req.body;

  const Casedetails = new Casedetail({ lspid, userid, title, desc, accept });
  await Casedetails.save();

  res.send("connection sent and stored in the database");
});

// Endpoint to get all notifications for a specific advocate from the database, sorted from latest to oldest
app.get("/getuserconnect/:userid", async (req, res) => {
  const { userid } = req.params;

  // Retrieve all notifications for the advocate from the database, sorted by timestamp in descending order
  try {
    const caseDetails = await Casedetail.findOne({
      userid: userid,
      accept: true,
    });

    if (!caseDetails) {
      return res
        .status(404)
        .json({ message: "Case not found or not accepted." });
    }

    res.status(200).json({ caseDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/getcasedetails/:lspid", async (req, res) => {
  const { lspid } = req.params;

  // Retrieve all notifications for the advocate from the database, sorted by timestamp in descending order
  try {
    const caseDetails = await Casedetail.find({
      lspid: lspid,
    });

    if (!caseDetails) {
      return res
        .status(404)
        .json({ message: "Case not found or not accepted." });
    }

    res.status(200).json({ caseDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/getcasedetailss/:userid", async (req, res) => {
  const { userid } = req.params;

  // Retrieve all notifications for the advocate from the database, sorted by timestamp in descending order
  try {
    const caseDetails = await Casedetail.find({
      userid: userid,
    });

    if (!caseDetails) {
      return res
        .status(404)
        .json({ message: "Case not found or not accepted." });
    }

    res.status(200).json({ caseDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/caseupdate/:caseid", async (req, res) => {
  const caseid = req.params.caseid;
  const { appointmentdate } = req.body;
  try {
    // Use updateOne to update only the specified fields (title and desc)
    await Casedetail.updateOne(
      { _id: caseid },
      { $set: { accept: true, appointmentdate: appointmentdate } }
    );

    res.status(200).json({ message: "accepted", appointmentdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "rejected" });
  }
});
app.post("/paymentupdate/:caseid", async (req, res) => {
  const caseid = req.params.caseid;
  try {
    // Use updateOne to update only the specified fields (title and desc)
    await Casedetail.updateOne({ _id: caseid }, { $set: { payment: true } });

    res.status(200).json({ message: "paid" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "not paid" });
  }
});

app.post("/caseupdatee/:caseid", async (req, res) => {
  const caseid = req.params.caseid;

  try {
    // Use updateOne to update only the specified fields (title and desc)
    await Casedetail.updateOne({ _id: caseid }, { $set: { accept: false } });

    res.status(200).json({ message: "rejected" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
});

app.get("/cased/:caseid", async (req, res) => {
  const caseid = req.params.caseid;

  try {
    const caseDetails = await Casedetail.find({
      _id: caseid,
    });

    if (!caseDetails) {
      return res
        .status(404)
        .json({ message: "Case not found or not accepted." });
    }

    res.status(200).json({ caseDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// // real time chat
// app.use("/chat", ChatRoute);
// app.use("/message", MessageRoute);
//--------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------

app.get("/getproduct", async (req, res) => {
  try {
    await Product.find({}).then((data) => {
      res.send({ status: "ok", data });
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.get("/getorderdetails", async (req, res) => {
  try {
    await Order.find({}).then((data) => {
      res.send({ status: "ok", data });
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.get("/count", async (req, res) => {
  try {
    const pcount = await Product.find().count();
    const ucount = await User.find().count();
    const ocount = await Order.find().count();
    res.json({ count: ucount, ccount: pcount, cccount: ocount });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.get("/billingaddress/:billno", async (req, res) => {
  const billno = req.params.billno;
  try {
    const data = await Order.find({ billno });
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.get("/sortingproducts", async (req, res) => {
  try {
    const { catagory, color, sortBy } = req.query;
    let query = {};

    if (catagory) {
      query.catagory = catagory;
    }

    if (color) {
      query.color = color;
    }
    let products = await Product.find(query);

    if (sortBy) {
      products = products.sort((a, b) => {
        if (sortBy === "price-asc") {
          return a.price - b.price;
        } else if (sortBy === "price-desc") {
          return b.price - a.price;
        } else {
          return 0;
        }
      });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/billproduct/:billno", async (req, res) => {
  const billno = req.params.billno;
  try {
    const data = await Bill.find({ billno });
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.delete("/deleteproduct/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully", data });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

// const verifyToken = (req, res, next) => {
//   const token = req.headers.token;
//   if (!token) {
//     return res.status(403).json({ message: "Token not provided" });
//   }

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Invalid token" });
//     }
//     req.userId = decoded.userId;
//     const userId = req.userId;
//     res.json({ userId });
//     next();
//   });
// };

// app.get("/protected", verifyToken, (req, res) => {
//   res.json({ message: "This is a protected route" });
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// const PORT = 5001;

// wss.on("connection", (ws) => {
//   console.log("A user connected");

//   ws.on("message", (message) => {
//     // Broadcast the Zoom call link to all connected users
//     wss.clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });

//   ws.on("close", () => {
//     console.log("User disconnected");
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });
