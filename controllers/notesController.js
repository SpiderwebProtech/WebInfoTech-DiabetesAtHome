const dateFunctions = require("../public/javascript/dateFunctions");

const Notes = require("../models/notesModel");

const getNotesForPatientId = async (id) => {
  try {
    const notes = await Notes.find({ patient: id }).sort({ time: -1 }).lean();
    if (!notes) {
      return null;
    }
    return notes;
  } catch (err) {
    return null;
  }
};

const addNoteForPatient = async (id, note) => {
  console.log(id);
  if (note !== "") {
    await Notes.create({
      patient: id,
      note: note,
      time: dateFunctions.getMelbourneTime(),
    });
  }
};

module.exports = {
  getNotesForPatientId,
  addNoteForPatient,
};
