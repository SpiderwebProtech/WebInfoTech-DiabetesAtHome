const patientController = require("../controllers/patientController");
const patientDayController = require("../controllers/patientDayController");
const notesController = require("../controllers/notesController");

const Clinician = require("../models/clinicianModel");
const Patient = require("../models/patientModel");
const dateFunctions = require("../public/javascript/dateFunctions");
const PatientDay = require("../models/patientDayModel");

const getAllPatientsForClincianId = async (id) => {
  try {
    const patients = await Patient.find({ clinician: id }).lean();
    if (!patients) {
      return null;
    }
    return patients;
  } catch (err) {
    return null;
  }
};

const getClinicianById = async (id) => {
  try {
    const clinician = await Clinician.findById(id).lean();
    if (!clinician) {
      return null;
    }
    return clinician;
  } catch (err) {
    return null;
  }
};

const getAllPatientDaysForPatients = async (patientIds) => {
  patientDayController.updateEngagementForIds(patientIds);
  const patientDays = await Promise.all(
    patientIds.map(async (id) =>
      patientDayController.getPatientDayByPatientIdTodayDropId(id)
    )
  );
  return patientDays;
};

const getAllPatientIDsForClinicianId = async (id) => {
  const patientIds = await (
    await Patient.find({ clinician: id })
  ).map((patient) => patient._id);
  return patientIds;
};

const combinePatientAndDays = (patients, patientDays) => {
  const combined = [];
  for (let i = 0; i < patients.length; i++) {
    combined.push(Object.assign(patients[i], patientDays[i]));
  }
  return combined;
};

const getClinicianDashboard = async (req, res) => {
  const patientDayController = require("../controllers/patientDayController");
  const comments = await patientDayController.getAllCommentsForClinicianId(
    req.session.passport.user.id
  );
  const clinician = await getClinicianById(req.session.passport.user.id);
  if (clinician) {
    const patients = await getAllPatientsForClincianId(clinician._id);
    const patientDays = await getAllPatientDaysForPatients(
      patients.map((patient) => patient._id)
    );
    const combined = combinePatientAndDays(patients, patientDays);
    return res.render("clinician/clinician-dashboard", {
      title: "Dashboard",
      clinician: clinician,
      combined: combined,
      comments: comments,
    });
  }
  return res.sendStatus(404);
};

const getClinicianAddPatient = async (req, res) => {
  const clinician = await getClinicianById(req.session.passport.user.id);
  return res.render("clinician/clinician-add-patient", {
    title: "Add Patient",
    clinician: clinician,
    error: "",
  });
};

const postClinicianAddPatient = async (req, res) => {
  const clinician = await getClinicianById(req.session.passport.user.id);
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.screenName
  ) {
    return res.render("clinician/clinician-add-patient", {
      title: "Add Patient",
      clinician: clinician,
      error: "Invalid Input",
    });
  }
  try {
    const patient = await Patient.create({
      name: req.body.name,
      screenName: req.body.screenName,
      email: req.body.email,
      password: req.body.password,
      clinician: clinician._id,
      bloodGlucoseRequired: true,
      weightRequired: true,
      insulinDosesRequired: true,
      exerciseRequired: true,
      engagement: 0,
    });
    await PatientDay.create({
      patient: patient._id,
      date: dateFunctions.getMelbourneDate(),
    });
    return res.redirect(`/clinician/${patient._id}/thresholds`);
  } catch (error) {
    console.log(error);
    return res.render("clinician/clinician-add-patient", {
      title: "Add Patient",
      clinician: clinician,
      error: "A User already exists for this email",
    });
  }
};

const getClinicanPatientDashboard = async (req, res) => {
  const comments = await getAllCommentsForPatientId(req.params.patientID);
  patientDayController.updateEngagementForId(req.params.patientID);
  const patientHistory = await patientDayController.getPatientHistoryById(
    req.params.patientID
  );
  const clinician = await getClinicianById(req.session.passport.user.id);
  const patient = await patientController.getPatientById(req.params.patientID);
  return res.render("clinician/clinician-patient-view", {
    title: "Patient View",
    clinician: clinician,
    patientHistory: patientHistory,
    patient: patient,
    comments: comments,
  });
};

const getClinicanPatientThresholds = async (req, res) => {
  const clinician = await getClinicianById(req.session.passport.user.id);
  const patient = await patientController.getPatientById(req.params.patientID);
  return res.render("clinician/clinician-patient-thresholds", {
    patient: patient,
    clinician: clinician,
  });
};

const postClinicanPatientThresholds = async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.patientID, {
    $set: {
      bloodGlucoseRequired: !!req.body.bloodGlucoseRequired,
      weightRequired: !!req.body.weightRequired,
      insulinDosesRequired: !!req.body.insulinDosesRequired,
      exerciseRequired: !!req.body.exerciseRequired,
      bloodGlucoseLow: req.body.bloodGlucoseLower,
      weightLow: req.body.weightLower,
      insulinDosesLow: req.body.insulinDosesLower,
      exerciseLow: req.body.exerciseLower,
      bloodGlucoseHigh: req.body.bloodGlucoseUpper,
      weightHigh: req.body.weightUpper,
      insulinDosesHigh: req.body.insulinDosesUpper,
      exerciseHigh: req.body.exerciseUpper,
    },
  });
  return res.redirect("back");
};

const getClinicianPatientSupportMessage = async (req, res) => {
  const clinician = await getClinicianById(req.session.passport.user.id);
  const patient = await patientController.getPatientById(req.params.patientID);
  return res.render("clinician/clinician-patient-support-message", {
    patient: patient,
    clinician: clinician,
  });
};

const postClinicianPatientSupportMessage = async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.patientID, {
    supportMessage: req.body.supportMessage,
    supportMessageTime: dateFunctions.getMelbourneTime(),
  });
  return res.redirect("back");
};

const getClinicianNotes = async (req, res) => {
  const clinician = await getClinicianById(req.session.passport.user.id);
  const patient = await patientController.getPatientById(req.params.patientID);
  const notes = await notesController.getNotesForPatientId(
    req.params.patientId
  );
  return res.render("clinician/clinician-notes", {
    patient: patient,
    clinician: clinician,
    notes: notes,
  });
};

const postClinicianNotes = async (req, res) => {
  await notesController.addNoteForPatient(
    req.params.patientID,
    req.body.clinicianNote
  );
  return res.redirect("back");
};

module.exports = {
  getClinicianDashboard,
  getClinicianAddPatient,
  postClinicianAddPatient,
  getClinicanPatientDashboard,
  getClinicanPatientThresholds,
  postClinicanPatientThresholds,
  getClinicianPatientSupportMessage,
  postClinicianPatientSupportMessage,
  getClinicianNotes,
  postClinicianNotes,
  getAllPatientIDsForClinicianId,
};
