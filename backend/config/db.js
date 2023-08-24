const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/codial-react")
  .then(() => {
    console.log("db connected!");
  })
  .catch((e) => {
    console.log(e, "db not connect!");
  });
