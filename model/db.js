const mongoose = require("mongoose");
mongoose
  .connect("mongodb://0.0.0.0/BankAccess")
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("connection failed");
  });

const userSchema = mongoose.Schema({
  Account_num: String,
  Due_amount: Number,
  Customer_name: String,
  Customer_dob: String,
  Customer_relationship: String,
  Date_Inserted: String,
});

const paymentScheam = mongoose.Schema({
  Account_num: String,
  Payment_amount: Number,
  Payment_date: String,
});

const User = mongoose.model("user", userSchema);
const Payment = mongoose.model("payments", paymentScheam);

module.exports = { User, Payment };
