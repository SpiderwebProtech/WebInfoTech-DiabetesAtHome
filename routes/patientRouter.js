const express = require("express");

const patientRouter = express.Router();

const patientController = require("../controllers/patientController");

patientRouter.get("/", patientController.getPatientLogin);
patientRouter.post("/login", patientController.postPatientLogin);

patientRouter.get("/about-diabetes", (req, res) => {
  res.render("patient/about-diabetes");
});

patientRouter.get("/about-this-website", (req, res) => {
  res.render("patient/about-this-website");
});

patientRouter.get("/:id/dashboard", patientController.getPatientDashboard);
patientRouter.post("/:id/postday", patientController.postPatientDay);

module.exports = patientRouter;
