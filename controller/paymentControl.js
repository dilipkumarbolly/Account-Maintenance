const express = require("express");
const service = require("../service/paymentSrvice");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const paymentcontrol = async (req, res) => {
  const data = await service.createPayment(req, res);
  res.send(data);
};

const GetPayment = async (req, res) => {
  const { Account_num } = req.query;
  const data = await service.GetPayments(Account_num);
  res.send(data);
};

module.exports = { paymentcontrol, GetPayment };
