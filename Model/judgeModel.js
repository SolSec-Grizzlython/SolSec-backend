const mongoose = require("mongoose");
const validator = require('validator');

const JudgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Please provide email address"],
        unique: [true, "Email must be unique"],
        validate: [validator.isEmail, 'Please Enter A valid E-mail'],
    },
    contests: [{
        contestID: String,
        report: String,
        reward: Number,
    }],
    totalReward: {
        type: Number,
    },

});
module.exports = mongoose.model("judgeModel", JudgeSchema)
