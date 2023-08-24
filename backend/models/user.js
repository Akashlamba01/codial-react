const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    access_token: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userModel);
module.exports = User;
