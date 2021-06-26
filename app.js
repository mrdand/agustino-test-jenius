const express = require("express");
const cors = require("cors");
const app = express();

const route = require("./app/route/route");

require("dotenv").config();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// parse application/json
app.use(express.json())
app.get("/", (req, res) => {
    res.json({
        message: "Yes! This is made for Technical Test BTPN",
    });
});

app.use("/testing/v1", route);

module.exports = app;