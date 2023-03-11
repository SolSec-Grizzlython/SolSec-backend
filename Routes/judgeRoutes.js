const express = require("express");
const router = express.Router();

const {createJudge, applyForContest} = require("../Controller/judgeController");

router.route("/create").post(createJudge);

module.exports = router;