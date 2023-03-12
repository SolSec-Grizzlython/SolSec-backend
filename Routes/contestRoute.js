const express = require("express");
const router = express.Router();

const {
    createContest,
    getAllContests,
    getContest,
    startContest,
    endContest,
    getAllParticipants,
    addJudge
} = require("../Controller/contestController");

router.route("/create").post(createContest);
router.route("/getAll").get(getAllContests);
router.route("/get/:id").get(getContest);
router.route("/start/:id").patch(startContest);
router.route("/stop/:id").patch(endContest);
router.route("/getParticipants/:id").get(getAllParticipants);

module.exports = router;