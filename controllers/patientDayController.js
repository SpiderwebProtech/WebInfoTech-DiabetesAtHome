const dateFunctions = require("../public/javascript/dateFunctions");

const PatientDay = require("../models/patientDayModel");

const getPatientDayByPatientIdToday = async (id) => {
  const today = dateFunctions.getCurrentDate();
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

module.exports = { getPatientDayByPatientIdToday };
