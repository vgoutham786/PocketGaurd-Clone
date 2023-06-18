const express = require("express");
const userModel = require("../Models/user.model");
const userRoute = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

userRoute.post("/register", async (req, res) => {
    let password = req.body.password;
    let email = req.body.email;
    req.body.time=new Date().getTime()
    // console.log(req.body)
    console.log(data)
    try {
        let userr = await userModel.findOne({ email: email });
        //console.log(userr)
        if (userr != null || userr != undefined) {
            res.status(400).send({ msg: "user already exists!!" })
            return
        }
        let hash = await bcrypt.hash(password, 5);
        //console.log(hash)
        let data = new userModel({ ...req.body, password: hash });
        
        data.save()
        res.status(200).send({ msg: "User Added" })
    } catch (error) {
        //console.log(error)

        res.status(400).send({ msg: error.message })
    }
})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        let data = await userModel.findOne({ email: email });
        
        bcrypt.compare(password, data.password, async function (err, result) {
            // result == true
            if (result) {
                data.active = true;
                await data.save();

                var token = jwt.sign({ userID: data._id, user: data.name }, 'eval');
                res.status(200).send({ msg: "Login successfull", token: token, role: data.role })
            } else {
                res.status(400).send({ msg: "Invalid password" })
            }
        });

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

userRoute.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        // Find the user by ID and delete
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) {
          return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'User deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
})

module.exports =
    userRoute
