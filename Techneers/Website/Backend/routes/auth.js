const {
  login,
  register,
  userdetails,
  getuser,
  setAvatar,
  logOut,
} = require("../controllers/UserController");

const {
  lsplogin,
  lspregister,
  lsplist,
  lspdetails,
  getlsp,
  getAllUsers,
} = require("../controllers/LspController");

const router = require("express").Router();

router.post("/login", login);
router.post("/lsplogin", lsplogin);
router.post("/register", register);
router.post("/lspregister", lspregister);
router.get("/getuserdetails/:id", userdetails);
router.get("/getuser", getuser);
router.get("/lspsearchdetails/:role", lsplist);
router.get("/lspdetails/:id", lspdetails);
router.get("/getlsp", getlsp);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
router.get("/allusers/:id", getAllUsers);

module.exports = router;
