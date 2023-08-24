const express = require("express");
require("dotenv").config();
require("./config/db");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  next();
});

app.use("/api/v1", require("./routes"));

app.listen(3001, () => {
  console.log("Server is runnig on Port: 3001");
});
