const Auditor = require('../Model/auditorModel');
const Contest = require('../Model/contestModel');
const User = require('../Model/userModel');


exports.createAuditor = async (req, res) => {
    try {
        const auditor = await Auditor.create({
            ...req.body
        });
        res.status(201).json({
            status: 'success',
            data: {
                auditor
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getAllAuditors = async (req, res) => {
    try {
        const auditors = await Auditor.find();
        res.status(200).json({
            status: 'success',
            results: auditors.length,
            data: {
                auditors
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getAuditor = async (req, res) => {
    try {
        const auditor = await Auditor.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                auditor
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.participateInContest = async (req, res) => {
    try {
        const contest = await Contest.findById(req.params.id);
        const user = await User.findById(req.params.userId);
        const userEmail = user.email;
        const auditor = await Auditor.findOne({ email: userEmail });   
        

        
        const participant = {
            participantID: auditor._id.toString(),
            reward: 0
        }
        const thiscontest = {
            contestID: contest._id.toString(),
            reward: 0
        }
        if (contest.contestStatus === 3) {
            
            contest.participants.push(participant);
            auditor.contests.push(thiscontest);
            
            await contest.save();
            await auditor.save();
            res.status(200).json({
                status: 'success',
                data: {
                    contest
                }
            });
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'Contest is not yet open for participation'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.submitFinding = async (req, res) => {
    try {
        const contest = await Contest.findById(req.params.id);
        // const user = await User.findById(req.params.userId);
        // const auditor = await Auditor.findById(req.params.userId);

        if (contest.contestStatus === 3) {
            const participant = contest.participants.find(
               
                (participant) => participant.participantID === req.params.userId
            );
            
            participant.finding = req.body.finding;
            await contest.save();
            res.status(200).json({
                status: 'success',
                data: {
                    contest
                }
            });
        } else {
            
            res.status(400).json({
                status: 'fail',
                message: 'Contest is not yet open for participation'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.contestHistory = async (req, res) => {

    try {
        const auditor = await Auditor.findById(req.params.userId);
        const contests = auditor.contests;
        res.status(200).json({
            status: 'success',
            data: {
                contests
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}