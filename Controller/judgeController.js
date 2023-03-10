const Judge = require("../Model/judgeModel");
const Contest = require("../Model/contestModel");

exports.createJudge = async (req, res) => {
    try {
        const judge = await Judge.create({
            ...req.body});
        res.status(201).json({
            status: "success",
            data: {
                judge,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
}

exports.applyForContest = async (req, res) => {
    try {
        const contest = await Contest.findById(req.params.id);
        const judge = await Judge.findById(req.params.judgeId);
        if (contest.contestStatus < 2){
            contest.judges.push(judge);
            await contest.save();
        }
        res.status(200).json({
            status: "success",
            data: {
                contest,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
}

// exports.submitReport = async (req, res) => {