const express = require("express");
const { verifyToken } = require("../config/middelware");
const router = express.Router();

router.use("/users", require("./user"));
router.use("/posts", require("./post"));
router.use("/friendship", require("./friendship"));

module.exports = router;
