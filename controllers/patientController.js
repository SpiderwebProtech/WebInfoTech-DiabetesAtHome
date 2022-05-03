const dateFunctions = require("../public/javascript/dateFunctions");

const Patient = require("../models/patientModel");
const PatientDay = require("../models/patientDayModel");

const patientDayController = require("../controllers/patientDayController");

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

module.exports = {
  getPatientDashboard,
  postPatientDay,
  getPatientById,
};
