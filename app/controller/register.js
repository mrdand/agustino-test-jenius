const dbConfig = require('../config/database');
let http = require("../config/http");
const { parse_require } = require("../helper/parse_require");

async function createUser(req, res) {
  const collection = dbConfig.db("btpn-agustino").collection("user");
  let body = req.body;
  let response = {
    status: true,
    result: {},
    error: {}
  };

  const parameter = {
    userName: body.userName,
    accountNumber: body.accountNumber,
    emailAddress: body.emailAddress,
    identityNumber: body.identityNumber,
  };

  const schema = {
    userName: {
      require: () => (!!body.userName ? "" : `username cannot be empty`),
    },
    accountNumber: {
      require: () => (!!body.accountNumber ? "" : `account number cannot be empty`),
    },
    emailAddress: {
      require: () => (!!body.emailAddress ? "" : `email address cannot be empty`),
    },
    identityNumber: {
      require: () => (!!body.identityNumber ? "" : `identity number cannot be empty`),
    },
  };
  const error = parse_require(schema);

  if (!error) {
    try {
      let findByNumber = await new Promise((resolve) =>
        collection
          .findOne({ accountNumber: body.accountNumber })
          .then((result) => {
            return resolve(result);
          })
          .catch((error) => console.error(error))
      );
      if (!findByNumber) { /* if didnt register */
        let query = await new Promise((resolve) =>
          collection
            .insertOne(parameter)
            .then((result) => {
              return resolve(result);
            })
            .catch((error) => console.error(error))
        );
        response.result.id = query.insertedId;
      } else {
        response.status = false;
        response.error.message = `This account number [${body.accountNumber}] has been registered!`;
      }
      return response;
    } catch (err) {
      console.log(err)
      res.status(500);
      res.json(http.responseHttp(500, err, false));
    }
  } else {
    response.status = false;
    response.error = error ? error : {};
  }

  return response
}

module.exports = {
  createUser,
};
