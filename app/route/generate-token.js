const express = require("express");
let controller = require("../controller/generate-token");
let http = require("../config/http");
const dbConfig = require("../config/database");
const router = express.Router();

dbConfig.connect((err, db) => {
  // perform actions on the collection object
  if (err) {
    console.error("Could not connect to the database. Exiting now...");
  } else {
    console.log("Successfully connected to the database!");
    router.get("/", async function (req, res, next) {
      try {
        const response = await controller.generate_token(req, db, res);
        res.json(http.responseHttp(200, response, false));
      } catch (error) {
        console.log(error);
        res.status(500);
        res.json(http.http_response(500, error, false));
      }
    });
  }
});

module.exports = router;
