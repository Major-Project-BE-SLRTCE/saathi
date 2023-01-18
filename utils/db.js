const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

const connectToDb = async () => {
  try {
    // local mongodb
    await mongoose.connect("mongodb://127.0.0.1:27017/saathi");

    // online (or web) mongodb
    // await mongoose.connect(MONGO_URI);

    console.log("Connected to MongoDB.");
  } catch (err) {
    console.log("An error occurred while connecting to MongoDB:\n" + err);
  }
};

module.exports = connectToDb;
