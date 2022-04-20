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
  if (patient) {
    return res.render("patient/patient-dashboard", {
      title: "Dashboard",
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

const postPatientDay = (req, res) => {
  return res.redirect("back");
};

module.exports = {
  getPatientDashboard,
  getPatientLogin,
  postPatientLogin,
  postPatientDay,
};
