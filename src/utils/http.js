var axios = require("axios");
var baseURL = process.env.SWAPI_BASE_URL;
var instance = axios.create({
  baseURL,
  timeout: 10000,
});

module.exports = instance;
