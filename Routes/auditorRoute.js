const express = require("express");
const router = express.Router();
const {createAuditor,getAllAuditors,getAuditor,participateInContest, submitFinding, contestHistory} = require("../Controller/auditorController");
const {protect} = require("../Controller/authController");


router.route("/create").post(createAuditor);
router.route("/getAll").get(getAllAuditors);
router.route("/get/:id").get(getAuditor);
router.route("/participate/:id/:userId").patch(protect,participateInContest);
router.route("/submitFinding/:id/:userId").patch(submitFinding);
router.route("/getStats/:userId").get(contestHistory);


module.exports = router;