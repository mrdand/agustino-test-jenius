const express = require("express");
let controller = require("../controller/register");
let http = require("../config/http");
const middleware = require("../middleware");
const dbConfig = require("../config/database");
const router = express.Router();

dbConfig.connect((err, db) => {
  // perform actions on the collection object
  if (err) {
    console.error("Could not connect to the database. Exiting now...");
  } else {
    console.log("Successfully connected to the database!");
    router.post("/user", async function (req, res, next) {
      try {
        let response = await middleware.payloadAuthorization(req, res);
        if (response.status) {
          response = await controller.createUser(req, res);
        }
        res.json(http.responseHttp(200, response, false));
      } catch (error) {
        console.log(error);
        res.status(500);
        res.json(http.responseHttp(500, error, false));
      }
    });
  }
});

module.exports = router;