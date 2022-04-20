const dateFunctions = require("../public/javascript/dateFunctions");

const Patient = require("../models/patientModel");
const PatientDay = require("../models/patientDayModel");

const getPatientById = async (id) => {
  try {
    const patient = await Patient.findById(id).lean();
    if (!patient) {
      return null;
    }
    return patient;
  } catch (err) {
    return null;
  }
};

const getPatientDashboard = async (req, res) => {
  const patient = await getPatientById(req.params.id);
  await PatientDay.findOneAndUpdate(
    { patient: patient._id, date: dateFunctions.getCurrentDate() },
    {
      $setOnInsert: { date: dateFunctions.getCurrentDate() },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const patientDay = await PatientDay.findOne({
    patient: patient._id,
    date: dateFunctions.getCurrentDate(),
  }).lean();
  if (patient) {
    return res.render("patient/patient-dashboard", {
      title: "Dashboard",
      patient: patient,
      patientDay: patientDay,
    });
  }

  return res.sendStatus(404);
};

const getPatientLogin = (req, res) => {
  res.render("patient/patient-login", {
    title: "Login",
  });
};

const postPatientLogin = async (req, res) => {
  const patient = await Patient.findOne({ email: req.body.email }).lean();
  if (patient && patient.password && patient.password == req.body.password) {
    return res.redirect(`/patient/${patient._id}/dashboard`);
  }
  res.redirect("back");
};

const postPatientDay = async (req, res) => {
  await PatientDay.findOneAndUpdate(
    { patient: req.params.id, date: dateFunctions.getCurrentDate() },
    {
      bloodGlucose: req.body.bloodGlucose,
      insulinDoses: req.body.insulinDoses,
      weight: req.body.weight,
      exercise: req.body.exercise,
      $setOnInsert: { date: dateFunctions.getCurrentDate() },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  return res.redirect("back");
};

module.exports = {
  getPatientDashboard,
  getPatientLogin,
  postPatientLogin,
  postPatientDay,
};
