const dateFunctions = require("../public/javascript/dateFunctions");

const Patient = require("../models/patientModel");
const PatientDay = require("../models/patientDayModel");

const patientDayController = require("../controllers/patientDayController");

const getPatientById = async (id) => {
  try {
    const patient = await Patient.model.findById(id).lean();
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
  await PatientDay.model.findOneAndUpdate(
    { patient: patient._id, date: dateFunctions.getMelbourneDate() },
    {
      $setOnInsert: { date: dateFunctions.getMelbourneDate() },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const patientDay = await PatientDay.model
    .findOne({
      patient: patient._id,
      date: dateFunctions.getMelbourneDate(),
    })
    .lean();
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
  const patient = await Patient.model.findOne({ email: req.body.email }).lean();
  if (patient && patient.password && patient.password == req.body.password) {
    return res.redirect(`/patient/${patient._id}/dashboard`);
  }
  res.redirect("back");
};

const postPatientDay = async (req, res) => {
  patientDayController.validateAndInsert(req.params.id, req.body);
  return res.redirect("back");
};

module.exports = {
  getPatientDashboard,
  getPatientLogin,
  postPatientLogin,
  postPatientDay,
  getPatientById,
};
