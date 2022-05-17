const dateFunctions = require("../public/javascript/dateFunctions");

const Patient = require("../models/patientModel");
const PatientDay = require("../models/patientDayModel");

const patientDayController = require("../controllers/patientDayController");

const getAllPatientIDs = async () => {
  const IDs = await (
    await Patient.find({}, { _id: 1 })
  ).map((patient) => patient._id);
  return IDs;
};

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
  patientDayController.updateEngagementForId(req.session.passport.user.id);
  const patient = await getPatientById(req.session.passport.user.id);
  await PatientDay.findOneAndUpdate(
    { patient: patient._id, date: dateFunctions.getMelbourneDate() },
    {
      $setOnInsert: { date: dateFunctions.getMelbourneDate() },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const patientDay = await PatientDay.findOne({
    patient: patient._id,
    date: dateFunctions.getMelbourneDate(),
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

const postPatientDay = async (req, res) => {
  patientDayController.validateAndInsert(
    req.session.passport.user.id,
    req.body
  );

  return res.redirect("back");
};

const getPatientUpdatePassword = async (req, res) => {
  const patient = await getPatientById(req.session.passport.user.id);
  return res.render("patient/patient-update-password", {
    title: "Update Password",
    patient: patient,
  });
};

const postPatientUpdatePassword = async (req, res) => {
  if (req.body.password != req.body.passwordConfirm) {
    return;
  }
  const patient = await Patient.findById(req.session.passport.user.id);
  patient.password = req.body.password;
  await patient.save();
  return res.redirect("dashboard");
};

const getPatientHistory = async (req, res) => {
  patientDayController.updateEngagementForId(req.session.passport.user.id);
  const patient = await getPatientById(req.session.passport.user.id);
  const patientHistory = await patientDayController.getPatientHistoryById(
    req.session.passport.user.id
  );
  return res.render("patient/patient-history", {
    title: "History",
    patient: patient,
    patientHistory: patientHistory,
  });
};

const getLeaderboard = async () => {
  await patientDayController.updateAllEngagement();
  const leaderboard = Patient.find().sort({ engagement: -1 }).limit(5).lean();
  return leaderboard;
};

const getPatientLeaderboard = async (req, res) => {
  const patient = await getPatientById(req.session.passport.user.id);
  const leaderboard = await getLeaderboard();
  console.log(leaderboard);
  return res.render("patient/patient-leaderboard", {
    title: "Leaderboard",
    patient: patient,
    leaderboard: leaderboard,
  });
};

module.exports = {
  getAllPatientIDs,
  getPatientById,
  getPatientDashboard,
  postPatientDay,
  getPatientById,
  getPatientUpdatePassword,
  postPatientUpdatePassword,
  getPatientHistory,
  getPatientLeaderboard,
};
