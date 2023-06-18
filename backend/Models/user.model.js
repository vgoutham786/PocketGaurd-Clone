const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: Number,
    role: { type: String, default: "user" },
    age: Number,
    time:Number,
    active:{type:Boolean,default:false}
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel