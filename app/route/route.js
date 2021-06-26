const express = require("express");
const router = express.Router();
const register = require("./register");
const user = require("./user");
const login = require("./login");
const generate_token = require("./generate-token");
router.get("/", (req, res) => {
    res.json({
        message: "success API",
    });
}); 
router.use("/register", register);
router.use("/login", login);
router.use("/user", user);
router.use("/generate-token", generate_token);

module.exports = router;