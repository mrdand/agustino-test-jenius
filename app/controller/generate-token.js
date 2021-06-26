const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let moment = require("moment");
let http = require("../config/http");
const shortid = require('shortid');

async function generate_token(req, dbConfig, res) {
  let response = {
    status: true,
    result: {},
    error: {},
  };
  const token = await jwt.sign(
    { uniqueId: shortid.generate() },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "5d",
    }
  );
  response.result.token = token;
  return response;
}

module.exports = {
  generate_token,
};
