const mongoose = require("mongoose");

const patientDaySchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  date: { type: Date },
  bloodGlucose: { type: Number },
  weight: { type: Number },
  insulinDoses: { type: Number },
  exercise: { type: Number },
});

const PatientDay = mongoose.model("PatientDay", patientDaySchema);

module.exports = PatientDay;
