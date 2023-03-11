const mongoose = require("mongoose");

const ContestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    repoLink: {
        type: String,
        required: [true, "Repo Link is required"],
    },
    startDate: {
        type: Date,
        required: [false, "Start Date is required"],
    },
    duration: {
        type: Number,
        required: [true, "Duration is required"],
    },
    prizePool: {
        type: Number,
        required: [true, "Prize Pool is required"],
    },
    judges: [{
        judgeID: String,
        reward: Number,
        approval: Boolean, 
    }],
    contestStatus: {
        type: Number,
        enum: [0, 1, 2,3,4,5,6],
        default: 0,
        // 0 - Awaiting Approval
        // 1 - Approved, Judge not assigned
        // 2 - Judge Assigned, Upcoming
        // 3 - Ongoing
        // 4 - Awaiting Judgement
        // 5 - Judgement Under Review
        // 6 - Completed
        // 7 - Prize Distributed
    },
    participants: [{
        participantID: String,
        reward: Number,
        finding: {
            type: String,
            default: "No Finding",
        },
        findingSeverity: Number
    }],


    //distribution
    //bugLevel Classification

});

module.exports = mongoose.model("contestModel", ContestSchema)