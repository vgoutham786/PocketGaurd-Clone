const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const { connect } = require("./database/db");
var cors = require('cors')
app.use(cors())
app.get("/", (req, res) => {
    res.send("hello...");
});

const { debtrout } = require("./src/debt_payoff");
const bdroute = require("./src/budgetcalc.route");
const userRoute = require("./src/user.route");
app.use("/user", userRoute);
app.use("/debtcal", debtrout);

app.use("/bugcal", bdroute)

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    try {
        await connect
        console.log("db connected")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at  port ${port}`)
})