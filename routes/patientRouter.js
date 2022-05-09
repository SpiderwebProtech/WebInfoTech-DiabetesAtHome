const express = require("express");

const patientRouter = express.Router();

const patientController = require("../controllers/patientController");

patientRouter.get("/dashboard", patientController.getPatientDashboard);
patientRouter.get(
  "/update-password",
  patientController.getPatientUpdatePassword
);
// patientRouter.post("/update-password", patientController.postPatientUpdatePassword);
patientRouter.post("/postday", patientController.postPatientDay);

module.exports = patientRouter;
