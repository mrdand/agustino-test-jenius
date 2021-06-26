const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let moment = require("moment");
let http = require("../config/http");
const { parse_require } = require("../helper/parse_require");
var ObjectId = require("mongodb").ObjectID;

async function getByAll(req, dbConfig, res) {
  let response = {
    status: true,
    result: {},
    error: {},
  };
  try {
    const collection = dbConfig.db("btpn-agustino").collection("user");
    let findByAll = await new Promise((resolve) =>
      collection
        .find()
        .toArray()
        .then((result) => {
          return resolve(result);
        })
        .catch((error) => console.error(error))
    );
    let countBy = await new Promise((resolve) =>
      collection
        .countDocuments()
        .then((result) => {
          return resolve(result);
        })
        .catch((error) => console.error(error))
    );
    let make_array = [];
    findByAll.forEach((el) => {
      make_array.push({
        id: el._id,
        userName: el.userName,
        accountNumber: el.accountNumber,
        identityNumber: el.identityNumber,
        emailAddress: el.emailAddress,
      });
    });
    response.status = true;
    response.result = {
      data: make_array,
      total: countBy,
    };
    return response;
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json(http.responseHttp(500, err, false));
  }
}

async function getById(req, dbConfig, res) {
  let body = req.params;
  console.log(body.id);
  let response = {
    status: true,
    result: {},
    error: {},
  };
  const schema = {
    id: {
      require: () => (!!body.id ? "" : `id cannot be empty!`),
    },
  };
  const error = parse_require(schema);
  response.status = false;
  response.error = error ? error : {};

  if (!error) {
    try {
      const collection = dbConfig.db("btpn-agustino").collection("user");
      let findById = await new Promise((resolve) =>
        collection
          .findOne({ _id: ObjectId(body.id) })
          .then((result) => {
            return resolve(result);
          })
          .catch((error) => console.error(error))
      );
      console.log(findById);
      if (!!findById) {
        response.status = true;
        response.result = findById
      } else {
        response.status = false;
        response.error.message = `Data user is not found!`;
      }
      return response;
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json(http.responseHttp(500, err, false));
    }
  }
  return response;
}

async function getByAccountNumber(req, dbConfig, res) {
  let body = req.params;
  console.log(body.accountNumber);
  let response = {
    status: true,
    result: {},
    error: {},
  };
  const schema = {
    accountNumber: {
      require: () => (!!body.accountNumber ? "" : `account number cannot be empty!`),
    },
  };
  const error = parse_require(schema);
  response.status = false;
  response.error = error ? error : {};

  if (!error) {
    try {
      const collection = dbConfig.db("btpn-agustino").collection("user");
      let findByAccountNumber = await new Promise((resolve) =>
        collection
          .findOne({ accountNumber: body.accountNumber })
          .then((result) => {
            return resolve(result);
          })
          .catch((error) => console.error(error))
      );
      console.log(findByAccountNumber);
      if (!!findByAccountNumber) {
        response.status = true;
        response.result = findByAccountNumber;
      } else {
        response.status = false;
        response.error.message = `Data user is not found!`;
      }
      return response;
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json(http.responseHttp(500, err, false));
    }
  }
  return response;
}

async function getByIdentityNumber(req, dbConfig, res) {
  let body = req.params;
  console.log(body.IdentityNumber);
  let response = {
    status: true,
    result: {},
    error: {},
  };
  const schema = {
    id: {
      require: () => (!!body.IdentityNumber ? "" : `Identity number cannot be empty!`),
    },
  };
  const error = parse_require(schema);
  response.status = false;
  response.error = error ? error : {};

  if (!error) {
    try {
      const collection = dbConfig.db("btpn-agustino").collection("user");
      let findByIdentityNumber = await new Promise((resolve) =>
        collection
          .findOne({ identityNumber: body.IdentityNumber })
          .then((result) => {
            return resolve(result);
          })
          .catch((error) => console.error(error))
      );
      console.log(findByIdentityNumber);
      if (!!findByIdentityNumber) {
        response.status = true;
        response.result = findByIdentityNumber;
      } else {
        response.status = false;
        response.error.message = `User data is not found!`;
      }
      return response;
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json(http.responseHttp(500, err, false));
    }
  }
  return response;
}

async function deleteById(req, dbConfig, res) {
  let params = req.params;
  let response = {
    status: true,
    result: {},
    error: {},
  };
  const schema = {
    id: {
      require: () => (!!params.id ? "" : `id cannot be empty!`),
    },
  };
  const error = parse_require(schema);
  response.status = false;
  response.error = error ? error : {};

  if (!error) {
    try {
      const collection = dbConfig.db("btpn-agustino").collection("user");
      let findById = await new Promise((resolve) =>
        collection
          .findOne({ _id: ObjectId(params.id) })
          .then((result) => {
            return resolve(result);
          })
          .catch((error) => console.error(error))
      );
      if (!!findById) {
        var where = { _id: ObjectId(params.id) };

        let deleteById = await new Promise((resolve) =>
          collection
            .deleteOne(where)
            .then((result) => {
              return resolve(result);
            })
            .catch((error) => console.error(error))
        );
        response.status = true;
      } else {
        response.status = false;
        response.error.message = `User data is not found or is already deleted!`;
      }
      return response;
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json(http.responseHttp(500, err, false));
    }
  }
  return response;
}

async function updateById(req, dbConfig, res) {
  let params = req.params;
  let body = req.body;
  console.log(body.id);
  let response = {
    status: true,
    result: {},
    error: {},
  };
  const schema = {
    id: {
      require: () => (!!params.id ? "" : `id cannot be empty!`),
    },
  };
  const error = parse_require(schema);
  response.status = false;
  response.error = error ? error : {};

  if (!error) {
    try {
      const collection = dbConfig.db("btpn-agustino").collection("user");
      let findById = await new Promise((resolve) =>
        collection
          .findOne({ _id: ObjectId(params.id) })
          .then((result) => {
            return resolve(result);
          })
          .catch((error) => console.error(error))
      );
      if (!!findById) {
        var where = { _id: ObjectId(params.id) };
        var newvalues = { $set: body };

        let updateById = await new Promise((resolve) =>
          collection
            .updateOne(where, newvalues)
            .then((result) => {
              return resolve(result);
            })
            .catch((error) => console.error(error))
        );
        console.log(updateById);
        response.status = true;
      } else {
        response.status = false;
        response.error.message = `Identity data user is not found!`;
      }
      return response;
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json(http.responseHttp(500, err, false));
    }
  }
  return response;
}

module.exports = {
  getByAll,
  getById,
  getByAccountNumber,
  getByIdentityNumber,
  deleteById,
  updateById,
};
