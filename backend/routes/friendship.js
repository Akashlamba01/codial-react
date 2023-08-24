const express = require("express");
const { verifyToken } = require("../config/middelware");
const { addFriend } = require("../controller/friendController");
const router = express.Router();

router.post("/create-friendship", verifyToken, addFriend);
// router.get("/", getPosts);
// router.post("/login", login);

module.exports = router;
