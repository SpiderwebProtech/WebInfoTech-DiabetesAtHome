const express = require("express");

const clinicianRouter = express.Router();

const clinicianController = require("../controllers/clinicianController");

clinicianRouter.get("/", clinicianController.getClinicianLogin);
clinicianRouter.post("/login", clinicianController.postClinicianLogin);

clinicianRouter.get(
  "/:id/dashboard",
  clinicianController.getClinicianDashboard
);

clinicianRouter.get(
  "/:clinicianID/:patientID/thresholds",
  clinicianController.getClinicanPatientThresholds
);
// clinicianRouter.post(
//   "/:clinicianID/:patientID/thresholds",
//   clinicianController.postClinicanPatientThresholds
// );

clinicianRouter.get(
  "/:clinicianID/:patientID",
  clinicianController.getClinicanPatientDashboard
);

module.exports = clinicianRouter;
