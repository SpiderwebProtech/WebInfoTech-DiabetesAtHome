const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  secret: { type: String, required: true },
});

schema.methods.verifyPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, valid) => {
    callback(err, valid);
  });
};

const SALT_FACTOR = 10;

schema.pre("save", function save(next) {
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

const model = mongoose.model("User", schema);

module.exports = { schema, model };
