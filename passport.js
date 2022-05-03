const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/userModel");

User.model.find({}, (err, users) => {
  if (users.length > 0) return;
  User.model.create(
    {
      name: "test",
      email: "test@test.com",
      password: "hashed!",
      secret: "INFO30005",
    },
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Dummy user inserted");
    }
  );
});

passport.serializeUser((user, done) => {
  done(undefined, user._id);
});

passport.deserializeUser((userId, done) => {
  User.model.findById(userId, { password: 0 }, (err, user) => {
    if (err) {
      return done(err, undefined);
    }
    return done(undefined, user);
  });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.model.findOne({ username }, {}, {}, (err, user) => {
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
