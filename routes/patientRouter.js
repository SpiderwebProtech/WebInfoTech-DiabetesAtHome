const express = require("express");

const patientRouter = express.Router();

const patientController = require("../controllers/patientController");

patientRouter.get("/dashboard", patientController.getPatientDashboard);
patientRouter.post("/postday", patientController.postPatientDay);

patientRouter.get("/history", patientController.getPatientHistory);

patientRouter.get(
  "/update-password",
  patientController.getPatientUpdatePassword
);
patientRouter.post(
  "/update-password",
  patientController.postPatientUpdatePassword
);

module.exports = patientRouter;
