const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Patient = require("./models/patientModel");
const Clinician = require("./models/clinicianModel");

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
