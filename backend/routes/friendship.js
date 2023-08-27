const express = require("express");
const { verifyToken } = require("../config/middelware");
const { getFriend, friendToggle } = require("../controller/friendController");
const router = express.Router();

router.post("/create-friendship", verifyToken, friendToggle);
router.get("/friends", verifyToken, getFriend);
// router.get("/friends", getFriend);
// router.get("/", getPosts);
// router.post("/login", login);

module.exports = router;
