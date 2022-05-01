const mongoose = require("mongoose");
const userModel = require("./userModel");

const clinicianSchema = new mongoose.Schema({
  user: userModel,
  name: { type: String, required: true },
});

const Clinician = mongoose.model("Clinician", clinicianSchema);

module.exports = Clinician;
