const {
  bookinginfo,
  bookingdetails,
  allbookingdetails,
} = require("../controllers/Booking");

const router = require("express").Router();

router.post("/appointment", bookinginfo);
router.get("/details/:caseid", bookingdetails);
router.get("/alldetails", allbookingdetails);

module.exports = router;
