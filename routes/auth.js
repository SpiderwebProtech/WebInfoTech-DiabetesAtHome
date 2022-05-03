const passport = require("passport");
const express = require("express");
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return false;
  }
  return true;
};

const isPatientAuthenticated = (req, res, next) => {
  if (isAuthenticated(req)) {
    if (req.user.type == "P") {
      return next();
    }
  }
  return res.redirect("/patient/login");
};

const isClinicianAuthenticated = (req, res, next) => {
  if (isAuthenticated(req)) {
    if (req.user.type == "C") {
      return next();
    }
  }
  return res.redirect("/clinician/login");
};

router.get("/patient/login", (req, res) => {
  res.render("patient/patient-login", { flash: "error", title: "Login" });
});

router.post(
  "/patient/login",
  passport.authenticate("patient-local", {
    successRedirect: `/patient/dashboard`,
    failureRedirect: "/patient/login",
    failureFlash: true,
  })
);

router.get("/clinician/login", (req, res) => {
  res.render("clinician/clinician-login", { flash: "error", title: "Login" });
});

router.post(
  "/clinician/login",
  passport.authenticate("clinician-local", {
    successRedirect: `/clinician/dashboard`,
    failureRedirect: "/clinician/login",
    failureFlash: true,
  })
);

router.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

const patientRouter = require("./patientRouter");
const clinicianRouter = require("./clinicianRouter");

router.use("/patient", isPatientAuthenticated, patientRouter);
router.use("/clinician", isClinicianAuthenticated, clinicianRouter);

module.exports = router;
