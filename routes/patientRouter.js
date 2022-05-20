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

patientRouter.get("/leaderboard", patientController.getPatientLeaderboard);

patientRouter.get("/about-diabetes", (req, res) => {
  res.render("patient/patient-about-diabetes");
});

patientRouter.get("/about-this-website", (req, res) => {
  res.render("patient/patient-about-this-website");
});

module.exports = patientRouter;
