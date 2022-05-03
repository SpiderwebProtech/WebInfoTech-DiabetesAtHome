const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/userModel").model;
const Patient = require("./models/patientModel").model;
const Clinician = require("./models/clinicianModel").model;

// Clinician.create({
//     user: {
//         email: 'chris@chris.com',
//         password: 'clinicianChris',
//         name: 'Clinician Chris',
//     },
//     patients: [],
// })

// Patient.create({
//     user: {
//         email: 'pat@pat.com',
//         password: 'PasswordPat',
//         name: 'Patient Pat',
//     },
//     clinician: '6270d6e601ef8064afd1fe45',
//     bloodGlucoseRequired: true,
//     weightRequired: true,
//     insulinDosesRequired: true,
//     exerciseRequired: true,
// })

passport.serializeUser((user, done) => {
  done(undefined, user._id);
});

passport.deserializeUser((userId, done) => {
  Patient.findById(userId, { password: 0 }, (err, user) => {
    if (err) {
      return done(err, undefined);
    }
    return done(undefined, user);
  });
});

passport.use(
  new LocalStrategy((email, password, done) => {
    Patient.findOne({ user: { email: email } }, {}, {}, (err, user) => {
      console.log(user);
      if (err) {
        return done(undefined, false, {
          message: "Unknown error has occurred",
        });
      }
      if (!user) {
        return done(undefined, false, {
          message: "Incorrect username or password",
        });
      }

      user.verifyPassword(password, (err, valid) => {
        if (err) {
          return done(undefined, false, {
            message: "Unknown error has occurred",
          });
        }
        if (!valid) {
          return done(undefined, false, {
            message: "Incorrect username or password",
          });
        }
        return done(undefined, user);
      });
    });
  })
);

module.exports = passport;
