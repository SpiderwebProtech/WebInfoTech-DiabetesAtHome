const Clinician = require("../models/clinicianModel");
const Patient = require("../models/patientModel");
const PatientDay = require("../models/patientDayModel");
const dateFunctions = require("../public/javascript/dateFunctions");

const getAllPatientsForClincianId = async (id) => {
  try {
    const patients = await Patient.find({ clinician: id }).lean();
    if (!patients) {
      return null;
    }
    return patients;
  } catch (err) {
    return null;
  }
};

const getClinicianById = async (id) => {
  try {
    const clinician = await Clinician.findById(id).lean();
    if (!clinician) {
      return null;
    }
    return clinician;
  } catch (err) {
    return null;
  }
};

const getAllPatientDaysForPatients = async (patientIds) => {
  const date = dateFunctions.getCurrentDate();
  const patientDays = patientIds.map(id => (await PatientDay.findOne({patient: id, date: date}).lean()));
  return patientDays;
}


const getClinicianDashboard = async (req, res) => {
  const clinician = await getClinicianById(req.params.id);
  if (clinician) {
    const patients = await getAllPatientsForClincianId(clinician._id);
    const patientDays = await getAllPatientDaysForPatients(patients.map(patient => patient._id));
    console.log(patientDays)
    return res.render("clinician/clinician-dashboard", {
      title: "Dashboard",
      patients: patients,
    });
  }
  return res.sendStatus(404);
};

const getClinicianLogin = (req, res) => {
  res.render("clinician/clinician-login", {
    title: "Login",
  });
};

const postClinicianLogin = async (req, res) => {
  const clinician = await Clinician.findOne({ email: req.body.email }).lean();
  if (
    clinician &&
    clinician.password &&
    clinician.password == req.body.password
  ) {
    return res.redirect(`/clinician/${clinician._id}/dashboard`);
  }
  return res.redirect("/clinician");
};

module.exports = {
  getClinicianLogin,
  postClinicianLogin,
  getClinicianDashboard,
};
