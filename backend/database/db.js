const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.mongoURL;

const connect = mongoose.connect("mongodb+srv://goutham:goutham@cluster0.8xpdfgl.mongodb.net/budgetboost?retryWrites=true&w=majority")
module.exports = { connect }