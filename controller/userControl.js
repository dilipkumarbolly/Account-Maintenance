const express = require("express");
const uuid = require("uuid");
const service = require("../service/UserService");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const controlUser = async (req, res) => {
  const data = await service.createUSer(req, res);
  res.send(data);
};

module.exports = { controlUser };
