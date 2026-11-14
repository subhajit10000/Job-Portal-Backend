const mongoose = require("mongoose");

const recruiterActionSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },

    decision: {
      type: String,
      enum: ["Selected", "Rejected"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RecruiterAction = mongoose.model(
  "RecruiterAction",
  recruiterActionSchema
);

module.exports = RecruiterAction;
