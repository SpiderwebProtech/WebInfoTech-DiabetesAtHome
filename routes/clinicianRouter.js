const express = require("express");

const clinicianRouter = express.Router();

const clinicianController = require("../controllers/clinicianController");

clinicianRouter.get("/dashboard", clinicianController.getClinicianDashboard);

clinicianRouter.get("/add-patient", clinicianController.getClinicianAddPatient);

clinicianRouter.post(
  "/add-patient",
  clinicianController.postClinicianAddPatient
);

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

clinicianRouter.get(
  "/:patientID/support-message",
  clinicianController.getClinicianPatientSupportMessage
);

clinicianRouter.post(
  "/:patientID/support-message",
  clinicianController.postClinicianPatientSupportMessage
);

clinicianRouter.get(
  "/:patientID/clinician-notes",
  clinicianController.getClinicianNotes
);

clinicianRouter.post(
  "/:patientID/clinician-notes",
  clinicianController.postClinicianNotes
);

module.exports = clinicianRouter;
