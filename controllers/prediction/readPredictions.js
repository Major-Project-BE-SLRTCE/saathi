const Prediction = require("../../models/predictions");

const readPredictions = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);

    const predictionRes = await Prediction.find({ userId });
    console.log(predictionRes);

    // const predictionRes = await Prediction.find({});

    res.status(200).json({
      message: "Predictions fetched.",
      data: predictionRes
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      // message: Object.values(err.errors).map((e) => e.message)
      message: "Error while fetching predictions."
    });
  }
};

module.exports = readPredictions;
