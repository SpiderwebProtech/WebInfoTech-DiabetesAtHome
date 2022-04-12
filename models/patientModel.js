const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
