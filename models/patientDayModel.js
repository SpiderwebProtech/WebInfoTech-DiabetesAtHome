const mongoose = require("mongoose");

const patientDaySchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  date: { type: String },
  bloodGlucose: { type: Number, default: null },
  weight: { type: Number, default: null },
  insulinDoses: { type: Number, default: null },
  exercise: { type: Number, default: null },
});

const PatientDay = mongoose.model("PatientDay", patientDaySchema);

module.exports = PatientDay;
