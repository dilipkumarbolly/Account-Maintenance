const express = require("express");
const router = express.Router();
const paymentControl = require("../controller/paymentControl");

router.post("/payments", paymentControl.paymentcontrol);
router.post("/payment", paymentControl.GetPayment);

module.exports = router;
