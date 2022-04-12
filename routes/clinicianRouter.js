const express = require("express");

const clinicianRouter = express.Router();

clinicianRouter.get("/", (req, res) => {
  res.render("clinician/clinician-login");
});

module.exports = clinicianRouter;
