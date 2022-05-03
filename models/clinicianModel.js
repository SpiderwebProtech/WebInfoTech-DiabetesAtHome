const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_FACTOR = 10;

const clinicianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, default: "C" },
});

clinicianSchema.methods.verifyPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, valid) => {
    callback(err, valid);
  });
};

clinicianSchema.pre("save", function save(next) {
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

const Clinician = mongoose.model("Clinician", clinicianSchema);

module.exports = Clinician;
