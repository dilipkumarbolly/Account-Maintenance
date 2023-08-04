const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const app = express();
app.use(bodyParser.json());

app.use(userRoutes);
app.use(paymentRoutes);

app.listen(3000, () => {
  console.log("server working on accounts");
});
