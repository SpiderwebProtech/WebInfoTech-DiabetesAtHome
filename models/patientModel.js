const mongoose = require("mongoose");
const userModel = require("./userModel");

const patientSchema = new mongoose.Schema({
  user: userModel,
  name: { type: String, required: true },
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

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
