const Razorpay = require("razorpay");
const RAZORPAY_ID_KEY = "rzp_test_AW0ho6ZQgEOpU9";
const RAZORPAY_SECRET_KEY = "uNxW40s0toIDeH8QcHlOgavC";

const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_ID_KEY,
  key_secret: RAZORPAY_SECRET_KEY,
});

const createOrder = async (req, res) => {
  
  try {
    // console.log(req);
    const amount = req.body.amount * 100;
    const options = {
      amount: amount,
      currency: "INR",
      receipt: "razorUser@gmail.com",
    };

    razorpayInstance.orders.create(options, (err, order) => {
      if (!err) {
        res.status(200).send({
          success: true,
          msg: "Order Created",
          order_id: order.id,
          amount: amount,
          key_id: RAZORPAY_ID_KEY,
          product_name: req.body.name,
          description: req.body.description,
          contact: "8567345632",
          name: "subrat",
          email: "sandeep@gmail.com",
        });
      } else {
        res.status(400).send({ success: false, msg: "Something went wrong!" });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  // renderProductPage,
  createOrder,
};
