const patientController = require("../controllers/patientDayController");

const Clinician = require("../models/clinicianModel");
const PatientDay = require("../models/patientDayModel");
const Patient = require("../models/patientModel");

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
  const patientDays = await Promise.all(
    patientIds.map(async (id) =>
      patientController.getPatientDayByPatientIdToday(id)
    )
  );
  return patientDays;
};

const combinePatientAndDays = (patients, patientDays) => {
  const combined = [];
  for (let i = 0; i < patients.length; i++) {
    combined.push(Object.assign(patients[i], patientDays[i]));
  }
  return combined;
};

const getClinicianDashboard = async (req, res) => {
  const clinician = await getClinicianById(req.params.id);
  if (clinician) {
    const patients = await getAllPatientsForClincianId(clinician._id);
    const patientDays = await getAllPatientDaysForPatients(
      patients.map((patient) => patient._id)
    );
    const combined = combinePatientAndDays(patients, patientDays);
    return res.render("clinician/clinician-dashboard", {
      title: "Dashboard",
      combined: combined,
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
