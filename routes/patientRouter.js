const express = require("express");

const patientRouter = express.Router();

const patientController = require("../controllers/patientController");

patientRouter.get("/dashboard", patientController.getPatientDashboard);
patientRouter.post("/postday", patientController.postPatientDay);

module.exports = patientRouter;
