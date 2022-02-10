var axios = require("axios");
var baseURL = process.env.SWAPI_BASE_URL;

const get = (path) => {
  return axios.request({
    method: "get",
    url: path,
    baseURL,
    timeout: 10000,
  });
};

module.exports = { get };
