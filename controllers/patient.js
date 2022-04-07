const Patient = require('../models/Patient.js')

/**
 * GET /patientlogin
 * patientogin page.
 */
exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/');
    }
    res.render('account/patientlogin', {
      title: 'Login'
    });
  };

  