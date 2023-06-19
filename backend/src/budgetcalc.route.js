const express = require("express");

const bdroute = express.Router();
const budgetcalcmodel = require("../Models/budget.model")
const {auth}=require("../middleware/auth.middleware")

var cors = require('cors')
bdroute.use(cors())
bdroute.get("/", auth,async (req, res) => {

    const userId = req.body.userId;
    try {
       // console.log(userId)
        const data = await budgetcalcmodel.findOne({ userId: userId });
       // console.log(data)
        if (data) {
            res.send({ data: data })
        } else {
            res.send({ msg: "not found", data: null })
        }
    } catch (error) {
        res.send({ err: error.message })
    }

})

bdroute.post("/",auth, async (req, res) => {
   // console.log(req.body)
    const obj = req.body
    //obj.userId = req.body.userId
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