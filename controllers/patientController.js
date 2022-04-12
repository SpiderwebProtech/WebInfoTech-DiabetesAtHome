const Patient = require("../models/patientModel");

const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id).lean();
    if (!patient) {
      return res.sendStatus(404);
    }
    return res.send(patient);
  } catch (err) {
    return next(err);
  }
};

const getPatientLogin = (req, res) => {
  console.log("Login page called");
  res.render("patient/patient-login", {
    title: "Login",
  });
};

const postPatientLogin = async (req, res) => {
  const patient = await Patient.findOne({ email: req.body.email }).lean();
  if (patient && patient.password && patient.password == req.body.password) {
    res.redirect(`/patient/${patient._id}`);
  }
};

module.exports = { getPatientById, getPatientLogin, postPatientLogin };
