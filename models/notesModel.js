const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  time: { type: String },
  note: { type: String },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
