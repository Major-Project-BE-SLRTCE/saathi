const { Schema, model } = require("mongoose");

const predictionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required."]
    },
    messageId: {
      type: Schema.Types.ObjectId,
      required: [true, "Message ID is required."]
    },
    illness: {
      label: {
        type: String,
        required: [true, "Illness label is required."]
      },
      score: {
        type: Number,
        required: [true, "Illness score is required."]
      }
    },
    emotion: {
      label: {
        type: String,
        required: [true, "Illness label is required."]
      },
      score: {
        type: Number,
        required: [true, "Illness score is required."]
      }
    },
    intent: {
      label: {
        type: String,
        required: [true, "Illness label is required."]
      }
    }
  },
  { timestamps: true }
);

const Prediction = model("predictions", predictionSchema);
module.exports = Prediction;
