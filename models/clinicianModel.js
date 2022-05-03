const mongoose = require("mongoose");
const userModel = require("./userModel");
const patientModel = require("./patientModel");

const schema = new mongoose.Schema({
  user: {
    type: userModel.schema,
    default: {},
  },
  patients: [patientModel.schema],
});

const model = mongoose.model("Clinician", schema);

module.exports = { schema, model };
