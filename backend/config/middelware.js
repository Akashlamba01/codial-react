const User = require("../models/user");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  // console.log(req, "reeeeeeeee");
  // console.log(authHeader, " tooooooooooooooooo");

  if (typeof authHeader === "undefined") {
    return res.status(400).json({
      message: "Token not provided!",
    });
  }

  let token = authHeader.split(" ");
  token = token[1];
  // console.log(token);

  jwt.verify(token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
        success: false,
      });
    }

    const user = await User.findOne({ access_token: token });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Token!",
        success: false,
      });
    }

    req.userData = user;
    // console.log(user);
    next();
  });
};

module.exports = {
  verifyToken,
};
