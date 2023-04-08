const router = require("express").Router();

const readPredictions = require("../controllers/prediction/readPredictions");

router.get("/read", async (req, res) => {
  await readPredictions(req, res);
});

module.exports = router;
