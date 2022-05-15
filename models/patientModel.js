const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_FACTOR = 10;

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, default: "P" },
  clinician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinician",
    required: true,
  },
  supportMessage: { type: String, default: "" },
  supportMessageTime: { type: String, default: null },
  bloodGlucoseRequired: { type: Boolean, required: true },
  weightRequired: { type: Boolean, required: true },
  insulinDosesRequired: { type: Boolean, required: true },
  exerciseRequired: { type: Boolean, required: true },
  bloodGlucoseLow: { type: Number, default: null },
  weightLow: { type: Number, default: null },
  insulinDosesLow: { type: Number, default: null },
  exerciseLow: { type: Number, default: null },
  bloodGlucoseHigh: { type: Number, default: null },
  weightHigh: { type: Number, default: null },
  insulinDosesHigh: { type: Number, default: null },
  exerciseHigh: { type: Number, default: null },
});

patientSchema.methods.verifyPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, valid) => {
    callback(err, valid);
  });
};

patientSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
