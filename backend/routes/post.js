const express = require("express");
const { createPost, getPosts } = require("../controller/postController");
const { verifyToken } = require("../config/middelware");
const router = express.Router();

router.post("/create-post", verifyToken, createPost);
router.get("/", getPosts);
// router.post("/login", login);

module.exports = router;
