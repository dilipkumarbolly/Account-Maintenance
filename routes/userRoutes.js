const express = require("express");
const router = express.Router();
const userControl = require("../controller/userControl");

router.post("/account", userControl.controlUser);

module.exports = router;
