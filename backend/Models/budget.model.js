const mongoose = require("mongoose");

const budgetcalcSchema = mongoose.Schema({
    "userid": String,
    "income": Number,
    "rent": Number,
    "insurance": Number, "property tax": Number, "electricity": Number, "gas": Number, "water": Number, "internet serviece": Number, "cellphone": Number, "subscription": Number, "other": Number, "home": Number, "groceries": Number, "auto & transport": Number, "eating out": Number, "entertainment": Number, "health & medical": Number, "personal care": Number, "gift donation": Number, "clothing": Number, "education": Number, "electronics & software": Number, "kids": Number, "pet": Number, "shopping": Number, "sports & fitness": Number, "travel": Number, "credit card": Number, "loan": Number, "mortrage": Number, "insurance debt": Number, "savings": Number
})

const budgetcalcmodel = mongoose.model("budgetCalc", budgetcalcSchema);


model.exports = budgetcalcmodel