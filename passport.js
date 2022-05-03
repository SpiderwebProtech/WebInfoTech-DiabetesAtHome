const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Patient = require("./models/patientModel");
const Clinician = require("./models/clinicianModel");

// Clinician.create({
//     email: 'chris@chris.com',
//     password: 'clinicianChris',
//     name: 'Clinician Chris',
//     patients: [],
// })

// Patient.create({
//     email: 'pat@pat.com',
//     password: 'patientPat',
//     name: 'Patient Pat',
//     clinician: '6270e3f3eeee6c1674255d88',
//     bloodGlucoseRequired: true,
//     weightRequired: true,
//     insulinDosesRequired: true,
//     exerciseRequired: true,
// })

passport.serializeUser((obj, done) => {
  if (obj instanceof Clinician) {
    done(null, { id: obj._id, type: "C" });
  } else {
    done(null, { id: obj._id, type: "P" });
  }
});

passport.deserializeUser((obj, done) => {
  if (obj.type === "C") {
    Clinician.findById(obj.id, { password: 0 }).then((user) =>
      done(null, user)
    );
  } else {
    Patient.findById(obj.id, { password: 0 }).then((user) => done(null, user));
  }
});

// passport.serializeUser((user, done) => {
//   done(undefined, user._id);
// });

// const isPatient = async (userId) => !!(await Patient.exists({ _id: userId }));
// const isClinician = async (userId) =>
//   !!(await Clinician.exists({ _id: userId }));

// passport.deserializeUser((userId, done) => {
//   if (isPatient(userId)) {
//     Patient.findById(userId, { password: 0 }, (err, user) => {
//       if (err) {
//         return done(err, undefined);
//       }
//       return done(undefined, user);
//     });
//   }
//   if (isClinician(userId)) {
//     Clinician.findById(userId, { password: 0 }, (err, user) => {
//       if (err) {
//         return done(err, undefined);
//       }
//       return done(undefined, user);
//     });
//   }

//   return done(null, false);
// });

passport.use(
  "patient-local",
  new LocalStrategy({ usernameField: "email" }, (username, password, done) => {
    Patient.findOne({ username }, {}, {}, (err, user) => {
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

passport.use(
  "clinician-local",
  new LocalStrategy({ usernameField: "email" }, (username, password, done) => {
    Clinician.findOne({ username }, {}, {}, (err, user) => {
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
