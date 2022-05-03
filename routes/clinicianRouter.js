const express = require("express");

const clinicianRouter = express.Router();

const clinicianController = require("../controllers/clinicianController");

// clinicianRouter.get("/", clinicianController.getClinicianLogin);
// clinicianRouter.post("/login", clinicianController.postClinicianLogin);

clinicianRouter.get("/dashboard", clinicianController.getClinicianDashboard);

clinicianRouter.get(
  "/:patientID/thresholds",
  clinicianController.getClinicanPatientThresholds
);
clinicianRouter.post(
  "/:patientID/thresholds",
  clinicianController.postClinicanPatientThresholds
);

clinicianRouter.get(
  "/:patientID",
  clinicianController.getClinicanPatientDashboard
);

module.exports = clinicianRouter;
