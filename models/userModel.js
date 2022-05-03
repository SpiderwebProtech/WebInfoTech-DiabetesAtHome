const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const patientSchema = require("./patientModel").schema;
const clinicianSchema = require("./clinicianModel").schema;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  isPatient: { type: Boolean, default: false },
  isClinician: { type: Boolean, default: false },
  patientFields: { patientSchema, required: false },
  clinicianFields: { clinicianSchema, required: false },
});

userSchema.methods.verifyPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, valid) => {
    callback(err, valid);
  });
};

const SALT_FACTOR = 10;

userSchema.pre("save", function save(next) {
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

const userModel = mongoose.model("User", schema);

module.exports = userModel;
