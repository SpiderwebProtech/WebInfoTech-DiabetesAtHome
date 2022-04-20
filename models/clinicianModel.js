const mongoose = require("mongoose");

const clinicianSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

const Clinician = mongoose.model("Clinician", clinicianSchema);

module.exports = Clinician;
