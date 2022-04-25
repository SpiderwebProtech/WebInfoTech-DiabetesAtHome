const dateFunctions = require("../public/javascript/dateFunctions");

const PatientDay = require("../models/patientDayModel");
const Patient = require("../models/patientModel");

const getPatientDayByPatientIdToday = async (id) => {
  const today = dateFunctions.getMelbourneDate();
  try {
    const patientDay = await PatientDay.findOne({
      patient: id,
      date: today,
    }).lean();
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
    const patientDay = await PatientDay.findOne(
      {
        patient: id,
        date: today,
      },
      { _id: 0 }
    ).lean();
    if (!patientDay) {
      return null;
    }
    return patientDay;
  } catch (err) {
    return null;
  }
};

const getPatientHistoryById = async (id) => {
  const date = dateFunctions.getMelbourneDate();
  try {
    const patientHistory = await PatientDay.find({ patient: id })
      .sort({ date: -1 })
      .lean();
    if (!patientHistory) {
      return null;
    }
    // console.log(patientHistory.slice(-1)[0].date)
    // const dateArray = dateFunctions.getDates(dateFunctions.getProperDate(patientHistory.slice(-1)[0].date), dateFunctions.getProperDate(date))
    // console.log(dateArray)
    return patientHistory;
  } catch (err) {
    return null;
  }
};

module.exports = {
  getPatientDayByPatientIdToday,
  getPatientDayByPatientIdTodayDropId,
  getPatientHistoryById,
};
