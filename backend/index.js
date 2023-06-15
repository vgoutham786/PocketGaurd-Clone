const express=require("express");
const app=express();
app.use(express.json())
require("dotenv").config()
const {connect}=require("./database/db")


app.get("/",(req,res)=>{
    res.send("hello...")
})

const {debtrout}=require("./src/debt_payoff")
app.use("/debtcal",debtrout)



app.listen(process.env.port,async()=>{
   try {
    await connect
    console.log("connect to db")
   } catch (error) {
    
   }
    console.log(`server is running at ${process.env.port}`)
})