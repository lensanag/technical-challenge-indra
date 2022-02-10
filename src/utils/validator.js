const Ajv = require("ajv");
const ajv = new Ajv();

const generateValidator = (schema) => {
  return ajv.compile(schema);
};

module.exports = generateValidator;
