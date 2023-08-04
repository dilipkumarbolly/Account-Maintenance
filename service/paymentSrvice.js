const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const app = express();
app.use(bodyParser.json());
const { User, Payment } = require("../model/db");

const createPayment = async (req, res) => {
  const { Account_num, Payment_amount, Payment_date } = req.body;
  if (!(Account_num, Payment_amount, Payment_date)) {
    return "all fields are compulsory";
  }

  const user1 = await User.find({ Account_num: Account_num });
  console.log(user1);
  if (!user1[0]) {
    return {
      operationId: uuid.v4(),
      message:
        "Invalid request, account number is not found. Insert the account and then insert the payments",
    };
  }
  if (Payment_amount < 1 || Payment_amount.toFixed(2) != Payment_amount) {
    return {
      operationId: uuid.v4(),
      message:
        "Invalid request, Payment_amount should have only two decimals and amount should be greater than 0",
    };
  }

  const [d, m, y] = Payment_date.split("/").map(Number);
  if (
    isNaN(d) ||
    isNaN(m) ||
    isNaN(y) ||
    d < 1 ||
    d > 31 ||
    m < 1 ||
    m > 12 ||
    y < 1000 ||
    y > 2023
  ) { 
    return { message: "Invalid date format. Please enter dd/mm/yy format." };
  }

  await Payment.create({
    Account_num: Account_num,
    Payment_amount: Payment_amount,
    Payment_date: Payment_date,
  });
  return { message: "payments created successfully" };
};

const GetPayments = async (Account_num) => {
  const payment = await Payment.find({ Account_num: Account_num });
  if (!payment[0]) {
    return "Account number is not present in our records";
  }
  return payment;
};

module.exports = { createPayment, GetPayments };
