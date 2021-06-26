const jwt = require("jsonwebtoken");

function payloadAuthorization(req, res) {
  let response = {
    status: true,
    result: {},
    error: {},
  };
  let header = JSON.stringify(req.headers);
  let header_key = JSON.parse(header);

  if (!!header_key["authorization"]) {
    let jwtToken = header_key["authorization"];
    jwtToken.startsWith("Bearer ");
    jwtToken = jwtToken.slice(7, jwtToken.length);
    jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        response.status = false;
        response.message = err;
      } else {
        response.data = decoded;
      }
    });
  } else {
    response.status = false;
    response.error.message = "Authorization header cannot be emptyd";
  }

  return response;
}

module.exports = {
  payloadAuthorization,
};
