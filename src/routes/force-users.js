var express = require("express");
var router = express.Router();
var { create, read } = require("../services/persistence");
var errorHandler = require("../utils/errorHandler");
const generateValidator = require("../utils/validator");

const schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    name: { type: "string" },
    specie: { type: "string" },
    type: { enum: ["Jedi", "Sith"] },
  },
  required: ["userId", "name", "specie", "type"],
};

const validate = generateValidator(schema);

/* GET force-users by id. */
router.get("/:id", async function (req, res, _) {
  try {
    const data = await read(req.params.id);
    if (!data) return res.status(404).json({ message: "not found" });
    return res.json(data);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/", async function (req, res, _) {
  try {
    const item = req.body;
    if (!validate(item)) {
      return errorHandler(res, { message: "json schema is not invalid!" });
    }
    await create(item);
    res.json({ userId: item.userId });
  } catch (error) {
    return errorHandler(res, error);
  }
});

module.exports = router;
