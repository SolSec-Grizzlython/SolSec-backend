const mongoose = require("mongoose");

const AuditorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Please provide email address"],
    },
    contests: [{
        contestID: String,
        findings: {
            type: String,
            default: "No Finding",
        },
        reward: Number,
    }],
    totalReward: {
        type: Number,
    },

});

const Auditor = mongoose.model("Auditor", AuditorSchema);
module.exports = Auditor;
