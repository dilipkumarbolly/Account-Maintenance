const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const app = express();
app.use(bodyParser.json());
const { User } = require("../model/db");

const createUSer = async (req, res) => {
  const {
    Account_num,
    Due_amount,
    Customer_name,
    Customer_dob,
    Customer_relationship,
  } = await req.body;

  const existUser = await User.findOne({ Account_num });
  if (existUser) {
    return "user already exists";
  }

  if (Account_num.trim().length < 6) {
    return {
      operationId: uuid.v4(),
      message: "Invalid request, AccountNumber length is too short",
    };
  }

  if (Due_amount < 1 || Due_amount.toFixed(2) != Due_amount) {
    return {
      operationId: uuid.v4(),
      message:
        "Invalid request, Due amount should have only two decimals and amount should be greater than 0",
    };
  }

  if (Customer_name.trim().length < 3) {
    return {
      operationId: uuid.v4(),
      message:
        "Invalid request, Customer_name is required with minimum length of 3",
    };
  }

  const [d, m, y] = Customer_dob.split("/").map(Number);
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

  const relationSet = new Set(["Primary", "Secondary", "Joint"]);
  if (!relationSet.has(Customer_relationship)) {
    return {
      operationId: uuid.v4(),
      message: "Invalid request, Customer_relationship is invalid",
    };
  }

  const user1 = await new User({
    Account_num: Account_num,
    Due_amount: Due_amount,
    Customer_name: Customer_name,
    Customer_dob: Customer_dob,
    Customer_relationship: Customer_relationship,
    Date_Inserted: new Date(),
  });

  await User.create(user1);
  return { message: "account created success" };
};

module.exports = {
  createUSer,
};
