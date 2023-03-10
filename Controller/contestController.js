const Contest = require("../Model/contestModel");
const Judge = require("../Model/judgeModel");

exports.createContest = async (req, res) => {
    try {
        const contest = await Contest.create({
            ...req.body});
        res.status(201).json({
            status: "success",
            data: {
                contest,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
}

exports.getAllContests = async (req, res) => {
    try {
        const contests = await Contest.find();
        res.status(200).json({
            status: "success",
            results: contests.length,
            data: {
                contests,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
}

exports.getContest = async (req, res) => {
    try {
        const contest = await Contest.findById(req.params.id);
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

exports.startContest = async (req, res) => {
    try {
        const contest = await Contest.findByIdAndUpdate(req.params.id, {
            contestStatus: 3,
        });
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

exports.endContest = async (req, res) => {
    try {
        const contest = await Contest.findByIdAndUpdate(req.params.id, {
            contestStatus: 4,
        });
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

exports.getAllParticipants = async (req, res) => {
    try {
        const contest = await Contest.findById(req.params.id);
        const participants = contest.participants;
        res.status(200).json({
            status: "success",
            data: {
                participants,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
}

exports.addJudge = async (req, res) => {
    try {
        const contest = await Contest.findById(req.params.id);
        const judge = await Judge.findById(req.params.userId);
        contest.judges.push({
            judgeID: judge._id,
            reward: 0,
        });
        await contest.save();
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