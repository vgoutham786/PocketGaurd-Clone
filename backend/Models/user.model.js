const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: Number,
    role: { type: String, default: "user" },
    city: String,
    time:Number
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel