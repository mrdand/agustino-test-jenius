function parse_require(schema) {
    let errors = {};
    Object.keys(schema).map((key) => {
      Object.keys(schema[key]).map((rule) => {
        let response_rule = schema[key][rule]();
        if (!!response_rule) errors[key] = response_rule;
      });
    });
    return Object.keys(errors).length === 0 ? false : errors;
  }
  
  module.exports = {
    parse_require,
  };
  