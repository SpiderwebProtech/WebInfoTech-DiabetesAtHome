const mongoose = require("mongoose");

const clinicianSchema = new mongoose.Schema({
  name: String,
});

const Clinician = mongoose.model("Clinician", clinicianSchema);

module.exports = Clinician;
