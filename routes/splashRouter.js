const express = require("express");

const splashRouter = express.Router();

splashRouter.get("/", (req, res) => {
  res.render("splash/login-splash.hbs");
});

splashRouter.get("/about-diabetes", (req, res) => {
  res.render("splash/about-diabetes");
});

splashRouter.get("/about-this-website", (req, res) => {
  res.render("splash/about-this-website");
});

module.exports = splashRouter;
