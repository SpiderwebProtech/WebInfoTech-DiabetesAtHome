const passport = require("passport");
const express = require("express");
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  return next();
};

router.get("/", isAuthenticated, (req, res) => {
  res.render("index", { title: "Dashboard", user: req.user.toJSON });
});

router.get("/login", (req, res) => {
  res.render("auth/auth-login", { flash: "error", title: "Login" });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/patient/about-us",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
