const express = require("express");
const { register, login, updateUser } = require("../controller/userController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/edit-profile", updateUser);

module.exports = router;
