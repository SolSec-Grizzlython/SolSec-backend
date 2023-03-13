const express = require("express");
const router = express.Router();
const protect = require("../Controller/authController").protect;
const restrictTo = require("../Controller/authController").restrictTo;

const {
    createContest,
    getAllContests,
    getContest,
    startContest,
    endContest,
    getAllParticipants,
    addJudge
} = require("../Controller/contestController");

router.route("/create").post(protect, restrictTo('protocol'),createContest);
router.route("/getAll").get(getAllContests);
router.route("/get/:id").post(protect, getContest);
router.route("/start/:id").patch(protect, restrictTo('protocol'),startContest);
router.route("/stop/:id").patch(protect, restrictTo('protocol'),endContest);
router.route("/getParticipants/:id").get(getAllParticipants);

module.exports = router;