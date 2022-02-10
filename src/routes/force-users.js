var express = require("express");
var router = express.Router();
var { create, read } = require("../services/persistence");
// var service = require("../services/swapi").films;
var errorHandler = require("../utils/errorHandler");

/* GET films by id. */
router.get("/:id", async function (req, res, _) {
  try {
    const data = await read(req.params.id);
    console.log(data);
    if (!data) return res.status(404).json({ message: "not found" });
    return res.json(data);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
  // return res.json({ messsage: "ok post", id: req.params.id });
  // service(req.params.id)
  //   .then(({ data }) => {
  //     return res.json(data);
  //   })
  //   .catch((err) => {
  //     return errorHandler(res, err);
  //   });
});

router.post("/", async function (req, res, _) {
  try {
    await create(req.body);
    res.json({ userId: req.body.userId });
  } catch (error) {
    return errorHandler(res, error);
  }
  // return res.json({ messsage: "ok post" });
  // service(req.params.id)
  //   .then(({ data }) => {
  //     return res.json(data);
  //   })
  //   .catch((err) => {
  //     return errorHandler(res, err);
  //   });
});

module.exports = router;
