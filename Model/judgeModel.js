const mongoose = require("mongoose");
const validator = require('validator');

const AuditorSchema = new mongoose.Schema({
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
        reward: Number,
    }],
    totalReward: {
        type: Number,
    },

});
module.exports = mongoose.model("auditorModel", AuditorSchema)
