const express = require("express");
const router = express.Router();
const { getMessages, postMessage } = require("../controllers/chatController");

router.get("/", getMessages);
router.post("/", postMessage);

module.exports = router;
