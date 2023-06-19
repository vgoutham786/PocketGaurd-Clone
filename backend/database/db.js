const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.mongoURL;

const connect = mongoose.connect(mongoURL)
module.exports = { connect }