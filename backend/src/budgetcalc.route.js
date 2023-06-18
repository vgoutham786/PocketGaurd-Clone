const express = require("express");

const bdroute = express.Router();
const budgetcalcmodel = require("../Models/budget.model")

bdroute.get("/", async (req, res) => {

    const userId = req.body.userId;
    try {
        const data = budgetcalcmodel.findOne({ userId: userId });
        if (data) {
            res.send({ data: data })
        } else {
            res.send({ msg: "not found", data: null })
        }
    } catch (error) {
        res.send({ err: error.message })
    }

})

bdroute.post("/", async (req, res) => {
    const obj = req.body.obj
    obj.userId = req.body.userId
    try {
        await budgetcalcmodel.insertMany([obj]);
        res.send({ msg: "data saved" })
    } catch (error) {
        res.send({ err: error.message })

    }
})
bdroute.patch("/", async (req, res) => {
    const userId = req.body.userId;
    const obj = req.body.obj;
    try {
        const data = budgetcalcmodel.findOne({ userId: userId });
        if (data) {
            await budgetcalcmodel.findByIdAndUpdate(data._id, { ...data, ...obj })
            res.send({ msg: "updated" })
        } else {
            res.send({ msg: "not found", data: null })
        }
    } catch (error) {
        res.send({ err: error.message })
    }

})

module.exports = bdroute