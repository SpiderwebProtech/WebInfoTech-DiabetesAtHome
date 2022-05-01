const passport = require("passport");
const express = require("express");
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  return next();
};

const hasRole = (thisRole) => {
  return (req, res, next) => {
    if (req.user.role == thisRole) return next();
    else {
      res.redirect("/");
    }
  };
};

// router.get('/clinician', isAuthenticated, (req, res) => {
//     res.render('clinician/clinician-dashboard', { title: 'Dashboard', user: req.user})
// })

// router.get('/clinician/login', (req, res) => {
//     res.render('clinician/clinician-login', { flash: req.flash('error'), title: 'Clinician Login'})
// })

// router.post('/clinician/login', passport.authenticate('local', {
//     successRedirect: '/clinician', failureRedirect: '/clinician/login', failureFlash: true
//     })
// )

// router.post('/clinician/logout', (req, res) => {
//     req.logout()
//     res.redirect('/')
// })

// modules.exports = router
