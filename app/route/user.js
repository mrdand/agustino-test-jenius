const express = require("express");
let controller = require("../controller/user");
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
    router.get("/", async function (req, res, next) {
      try {
        let response = await middleware.payloadAuthorization(req, res);
        if (response.status) {
          response = await controller.getByAll(req, db, res);
        }
        res.json(http.responseHttp(200, response, false));
      } catch (error) {
        console.log(error);
        res.status(500);
        res.json(http.responseHttp(500, error, false));
      }
    });
    router.get("/:id", async function (req, res, next) {
      try {
        let response = await middleware.payloadAuthorization(req, res);
        if (response.status) {
          response = await controller.getById(req, db, res);
        }
        res.json(http.responseHttp(200, response, false));
      } catch (error) {
        console.log(error);
        res.status(500);
        res.json(http.responseHttp(500, error, false));
      }
    });
    router.get("/account-number/:accountNumber", async function (req, res, next) {
      try {
        let response = await middleware.payloadAuthorization(req, res);
        if (response.status) {
          response = await controller.getByAccountNumber(req, db, res);
        }
        res.json(http.responseHttp(200, response, false));
      } catch (error) {
        console.log(error);
        res.status(500);
        res.json(http.responseHttp(500, error, false));
      }
    });
    router.get("/identity-number/:IdentityNumber", async function (req, res, next) {
      try {
        let response = await middleware.payloadAuthorization(req, res);
        if (response.status) {
          response = await controller.getByIdentityNumber(req, db, res);
        }
        res.json(http.responseHttp(200, response, false));
      } catch (error) {
        console.log(error);
        res.status(500);
        res.json(http.responseHttp(500, error, false));
      }
    });
    router.put("/update/:id", async function (req, res, next) {
      try {
        let response = await middleware.payloadAuthorization(req, res);
        if (response.status) {
          response = await controller.updateById(req, db, res);
        }
        res.json(http.responseHttp(200, response, false));
      } catch (error) {
        console.log(error);
        res.status(500);
        res.json(http.responseHttp(500, error, false));
      }
    });
    router.delete("/remove/:id", async function (req, res, next) {
      try {
        let response = await middleware.payloadAuthorization(req, res);
        if (response.status) {
          response = await controller.deleteById(req, db, res);
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
