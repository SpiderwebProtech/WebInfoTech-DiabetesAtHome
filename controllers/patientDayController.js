const dateFunctions = require("../public/javascript/dateFunctions");

const PatientDay = require("../models/patientDayModel");
const Patient = require("../models/patientModel");

const getPatientDayByPatientIdToday = async (id) => {
  const today = dateFunctions.getMelbourneDate();
  try {
    const patientDay = await PatientDay.model
      .findOne({
        patient: id,
        date: today,
      })
      .lean();
    if (!patientDay) {
      return null;
    }
    return patientDay;
  } catch (err) {
    return null;
  }
};

const getPatientDayByPatientIdTodayDropId = async (id) => {
  const today = dateFunctions.getMelbourneDate();
  try {
    const patientDay = await PatientDay.model
      .findOne(
        {
          patient: id,
          date: today,
        },
        { _id: 0 }
      )
      .lean();
    if (!patientDay) {
      return null;
    }
    return patientDay;
  } catch (err) {
    return null;
  }
};

const getPatientHistoryById = async (id) => {
  try {
    const patientHistory = await PatientDay.model
      .find({ patient: id })
      .sort({ date: -1 })
      .lean();
    if (!patientHistory) {
      return null;
    }
    // const filledPatientHistory = fillEmptyPatientDays(patientHistory)
    return patientHistory;
  } catch (err) {
    return null;
  }
};

const fillEmptyPatientDays = (patientHistory) => {
  const today = dateFunctions.getMelbourneDate();
  const firstDay = patientHistory.slice(-1)[0].date;
  const dateArray = dateFunctions.getDates(new Date(firstDay), new Date(today));

  return patientHistory;
};

const validateAndInsert = async (id, body) => {
  const patientDay = await PatientDay.model
    .findOne({
      patient: id,
      date: dateFunctions.getMelbourneDate(),
    })
    .lean();
  const patientDayExists = !!patientDay;

  const bloodGlucose =
    patientDayExists && !!patientDay.bloodGlucose
      ? patientDay.bloodGlucose
      : body.bloodGlucose;

  const bloodGlucoseTime =
    body.bloodGlucose && patientDayExists && !patientDay.bloodGlucoseTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.bloodGlucoseTime
      ? patientDay.bloodGlucoseTime
      : null;

  const bloodGlucoseComment =
    patientDayExists && !!patientDay.bloodGlucoseComment
      ? patientDay.bloodGlucoseComment
      : body.bloodGlucoseComment;

  const bloodGlucoseCommentTime =
    body.bloodGlucoseComment &&
    patientDayExists &&
    !patientDay.bloodGlucoseCommentTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.bloodGlucoseCommentTime
      ? patientDay.bloodGlucoseCommentTime
      : null;

  const insulinDoses =
    patientDayExists && !!patientDay.insulinDoses
      ? patientDay.insulinDoses
      : body.insulinDoses;

  const insulinDosesTime =
    body.insulinDoses && patientDayExists && !patientDay.insulinDosesTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.insulinDosesTime
      ? patientDay.insulinDosesTime
      : null;

  const insulinDosesComment =
    patientDayExists && !!patientDay.insulinDosesComment
      ? patientDay.insulinDosesComment
      : body.insulinDosesComment;

  const insulinDosesCommentTime =
    body.insulinDosesComment &&
    patientDayExists &&
    !patientDay.insulinDosesCommentTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.insulinDosesCommentTime
      ? patientDay.insulinDosesCommentTime
      : null;

  const weight =
    patientDayExists && !!patientDay.weight ? patientDay.weight : body.weight;

  const weightTime =
    body.weight && patientDayExists && !patientDay.weightTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.weightTime
      ? patientDay.weightTime
      : null;

  const weightComment =
    patientDayExists && !!patientDay.weightComment
      ? patientDay.weightComment
      : body.weightComment;

  const weightCommentTime =
    body.weightComment && patientDayExists && !patientDay.weightCommentTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.weightCommentTime
      ? patientDay.weightCommentTime
      : null;

  const exercise =
    patientDayExists && !!patientDay.exercise
      ? patientDay.exercise
      : body.exercise;

  const exerciseTime =
    body.exercise && patientDayExists && !patientDay.exerciseTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.exerciseTime
      ? patientDay.exerciseTime
      : null;

  const exerciseComment =
    patientDayExists && !!patientDay.exerciseComment
      ? patientDay.exerciseComment
      : body.exerciseComment;

  const exerciseCommentTime =
    body.exerciseComment && patientDayExists && !patientDay.exerciseCommentTime
      ? dateFunctions.getMelbourneTime()
      : patientDayExists && patientDay.exerciseCommentTime
      ? patientDay.exerciseCommentTime
      : null;

  await PatientDay.findOneAndUpdate(
    { patient: id, date: dateFunctions.getMelbourneDate() },
    {
      bloodGlucose: bloodGlucose,
      bloodGlucoseTime: bloodGlucoseTime,
      bloodGlucoseComment: bloodGlucoseComment,
      bloodGlucoseCommentTime: bloodGlucoseCommentTime,

      insulinDoses: insulinDoses,
      insulinDosesTime: insulinDosesTime,
      insulinDosesComment: insulinDosesComment,
      insulinDosesCommentTime: insulinDosesCommentTime,

      weight: weight,
      weightTime: weightTime,
      weightComment: weightComment,
      weightCommentTime: weightCommentTime,

      exercise: exercise,
      exerciseTime: exerciseTime,
      exerciseComment: exerciseComment,
      exerciseCommentTime: exerciseCommentTime,

      $setOnInsert: { date: dateFunctions.getMelbourneDate() },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

module.exports = {
  getPatientDayByPatientIdToday,
  getPatientDayByPatientIdTodayDropId,
  getPatientHistoryById,
  validateAndInsert,
};
