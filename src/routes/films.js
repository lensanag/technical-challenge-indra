var express = require("express");
var router = express.Router();
var service = require("../services/swapi").films;
var errorHandler = require("../utils/errorHandler");

/* GET films by id. */
router.get("/:id", async function (req, res, _) {
  service(req.params.id)
    .then(({ data }) => {
      return res.json(data);
    })
    .catch((err) => {
      return errorHandler(res, err);
    });
});

module.exports = router;
