const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  clinician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinician",
    required: true,
  },
  bloodGlucoseRequired: { type: Boolean, required: true },
  weightRequired: { type: Boolean, required: true },
  insulinDosesRequired: { type: Boolean, required: true },
  exerciseRequired: { type: Boolean, required: true },
  bloodGlucoseLow: { type: Number },
  weightLow: { type: Number },
  insulinDosesLow: { type: Number },
  exerciseLow: { type: Number },
  bloodGlucoseHigh: { type: Number },
  weightHigh: { type: Number },
  insulinDosesHigh: { type: Number },
  exerciseHigh: { type: Number },
});

const model = mongoose.model("Patient", schema);

module.exports = { schema, model };
