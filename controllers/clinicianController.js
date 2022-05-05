const patientController = require("../controllers/patientController");
const patientDayController = require("../controllers/patientDayController");

const Clinician = require("../models/clinicianModel");
const Patient = require("../models/patientModel");
const dateFunctions = require("../public/javascript/dateFunctions")

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
  const patientDays = await Promise.all(
    patientIds.map(async (id) =>
      patientDayController.getPatientDayByPatientIdTodayDropId(id)
    )
  );
  return patientDays;
};

const combinePatientAndDays = (patients, patientDays) => {
  const combined = [];
  for (let i = 0; i < patients.length; i++) {
    combined.push(Object.assign(patients[i], patientDays[i]));
  }
  return combined;
};

const getClinicianDashboard = async (req, res) => {
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
    });
  }
  return res.sendStatus(404);
};

const getClinicianAddPatient = async (req, res) => {
  const clinician = await getClinicianById(req.session.passport.user.id);
  return res.render("clinician/clinician-add-patient", {
    title: "Add Patient",
    clinician: clinician,
  });
};

const postClinicianAddPatient = async (req, res) => {
  console.log("POST");
  const clinician = await getClinicianById(req.session.passport.user.id);
  try {
    const patient = await Patient.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      clinician: clinician._id,
      bloodGlucoseRequired: true,
      weightRequired: true,
      insulinDosesRequired: true,
      exerciseRequired: true,
    });
    return res.redirect(`/clinician/${patient._id}/thresholds`);
  } catch {
    return res.redirect("back");
  }
};

const getClinicanPatientDashboard = async (req, res) => {
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

const getClinicianPatientMessage = async (req, res) => {
  const clinician = await getClinicianById(req.session.passport.user.id);
  const patient = await patientController.getPatientById(req.params.patientID);
  return res.render("clinician/clinician-patient-message", {
    patient: patient,
    clinician: clinician,
  });
};

const postClinicianPatientMessage = async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.patientID, {clinicianNote: req.body.clinicianNote, clinicianNoteTime: dateFunctions.getMelbourneTime()})
  return res.redirect("back")
};

module.exports = {
  getClinicianDashboard,
  getClinicianAddPatient,
  postClinicianAddPatient,
  getClinicanPatientDashboard,
  getClinicanPatientThresholds,
  postClinicanPatientThresholds,
  getClinicianPatientMessage,
  postClinicianPatientMessage,
};
