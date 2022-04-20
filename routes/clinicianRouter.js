const express = require("express");

const clinicianRouter = express.Router();

const clinicianController = require("../controllers/clinicianController");

clinicianRouter.get("/", clinicianController.getClinicianLogin);
clinicianRouter.post("/login", clinicianController.postClinicianLogin);

clinicianRouter.get(
  "/:id/dashboard",
  clinicianController.getClinicianDashboard
);

module.exports = clinicianRouter;
