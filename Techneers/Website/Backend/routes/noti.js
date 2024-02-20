const {
  sendnotification,
  getnotification,
} = require("../controllers/Newconnection");

const router = require("express").Router();

router.post("/sendnotification/:advocateId", sendnotification);
router.get("/getnotifications/:advocateId", getnotification);

module.exports = router;
