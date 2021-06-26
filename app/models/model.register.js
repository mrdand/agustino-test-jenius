const mongoose = require("mongoose");
const { Schema } = mongoose;

const register = new Schema({
    userName: String,
    accountNumber: String,
    emailAddress: String,
    identityNumber: String,
});

mongoose.model("Create", register);
