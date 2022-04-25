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
  const patientDay = await PatientDay.findOne({
    patient: req.params.id,
    date: dateFunctions.getMelbourneDate(),
  }).lean();
  const patientDayExists = !!patientDay;

  const bloodGlucoseTime =
    req.body.bloodGlucose && patientDayExists && !patientDay.bloodGlucoseTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.bloodGlucoseTime
      ? patientDay.bloodGlucoseTime
      : null;

  const bloodGlucoseCommentTime =
    req.body.bloodGlucoseComment &&
    patientDayExists &&
    !patientDay.bloodGlucoseCommentTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.bloodGlucoseCommentTime
      ? patientDay.bloodGlucoseCommentTime
      : null;

  const insulinDosesTime =
    req.body.insulinDoses && patientDayExists && !patientDay.insulinDosesTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.insulinDosesTime
      ? patientDay.insulinDosesTime
      : null;

  const insulinDosesCommentTime =
    req.body.insulinDosesComment &&
    patientDayExists &&
    !patientDay.insulinDosesCommentTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.insulinDosesCommentTime
      ? patientDay.insulinDosesCommentTime
      : null;

  const weightTime =
    req.body.weight && patientDayExists && !patientDay.weightTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.weightTime
      ? patientDay.weightTime
      : null;

  const weightCommentTime =
    req.body.weightComment && patientDayExists && !patientDay.weightCommentTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.weightCommentTime
      ? patientDay.weightCommentTime
      : null;

  const exerciseTime =
    req.body.exercise && patientDayExists && !patientDay.exerciseTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.exerciseTime
      ? patientDay.exerciseTime
      : null;

  const exerciseCommentTime =
    req.body.exerciseComment &&
    patientDayExists &&
    !patientDay.exerciseCommentTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.exerciseCommentTime
      ? patientDay.exerciseCommentTime
      : null;

  await PatientDay.findOneAndUpdate(
    { patient: req.params.id, date: dateFunctions.getMelbourneDate() },
    {
      bloodGlucose: req.body.bloodGlucose,
      bloodGlucoseTime: bloodGlucoseTime,
      bloodGlucoseComment: req.body.bloodGlucoseComment,
      bloodGlucoseCommentTime: bloodGlucoseCommentTime,

      insulinDoses: req.body.insulinDoses,
      insulinDosesTime: insulinDosesTime,
      insulinDosesComment: req.body.insulinDosesComment,
      insulinDosesCommentTime: insulinDosesCommentTime,

      weight: req.body.weight,
      weightTime: weightTime,
      weightComment: req.body.weightComment,
      weightCommentTime: weightCommentTime,

      exercise: req.body.exercise,
      exerciseTime: exerciseTime,
      exerciseComment: req.body.exerciseComment,
      exerciseCommentTime: exerciseCommentTime,

      $setOnInsert: { date: dateFunctions.getMelbourneDate() },
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
  getPatientById,
};
