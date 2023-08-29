const express = require("express");
const { verifyToken } = require("../config/middelware");
const { addFriend, removeFriend } = require("../controller/friendController");
const router = express.Router();

router.post("/create-friendship", verifyToken, addFriend);
router.post("/remove-friendship", verifyToken, removeFriend);
// router.get("/friends", getFriend);
// router.get("/", getPosts);
// router.post("/login", login);

module.exports = router;
