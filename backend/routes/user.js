const express = require("express");
const {
  register,
  login,
  updateUser,
  getUserById,
  getUserDetails,
} = require("../controller/userController");
const { verifyToken } = require("../config/middelware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/edit-profile", updateUser);
router.get("/:userId", verifyToken, getUserById);
router.get("/getUser", verifyToken, getUserDetails);

module.exports = router;
