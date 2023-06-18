const express=require("express")
const  userModel=require("../Models/user.model")
const admin=express.Router()

admin.get("/",async(req,res)=>{
    try {
        const countUser=await userModel.aggregate([{$sort:{"time":-1}}]);
        // console.log(countUser)
        const count=await userModel.countDocuments();
        res.status(200).send({"count":"successfully get data","data":countUser,"count":count})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports={admin}