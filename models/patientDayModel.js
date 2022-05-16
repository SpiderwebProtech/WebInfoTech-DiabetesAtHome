const { booleanParser } = require("config/parser");
const mongoose = require("mongoose");

const patientDaySchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  date: { type: String, required: true },
  valid: { type: Boolean, default: false },
  bloodGlucose: { type: Number, default: null },
  bloodGlucoseTime: { type: String, default: null },
  bloodGlucoseComment: { type: String, default: null },
  bloodGlucoseCommentTime: { type: String, default: null },
  insulinDoses: { type: Number, default: null },
  insulinDosesTime: { type: String, default: null },
  insulinDosesComment: { type: String, default: null },
  insulinDosesCommentTime: { type: String, default: null },
  weight: { type: Number, default: null },
  weightTime: { type: String, default: null },
  weightComment: { type: String, default: null },
  weightCommentTime: { type: String, default: null },
  exercise: { type: Number, default: null },
  exerciseTime: { type: String, default: null },
  exerciseComment: { type: String, default: null },
  exerciseCommentTime: { type: String, default: null },
});

const PatientDay = mongoose.model("PatientDay", patientDaySchema);

module.exports = PatientDay;
