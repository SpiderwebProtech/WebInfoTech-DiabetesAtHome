const Clinician = require("../models/clinicianModel");
const Patient = require("../models/patientModel");

const getAllPatientsForClincianId = async (id) => {
  try {
    const patients = await Patient.find({ clinician: id });
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

const getClinicianDashboard = async (req, res) => {
  const clinician = await getClinicianById(req.params.id);
  if (clinician) {
    const patients = await getAllPatientsForClincianId(clinician._id);
    return res.render("clinician/clinician-dashboard", {
      title: "Dashboard",
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
