const express = require("express");
const exphbs = require("express-handlebars");
const flash = require("express-flash");
const session = require("express-session");

require("./models");

const app = express();
const hbs = exphbs.create({});

hbs.handlebars.registerHelper({
  eq: (v1, v2) => v1 === v2,
  ne: (v1, v2) => v1 !== v2,
  lt: (v1, v2) => v1 < v2,
  gt: (v1, v2) => v1 > v2,
  lte: (v1, v2) => v1 <= v2,
  gte: (v1, v2) => v1 >= v2,
  and() {
    return Array.prototype.every.call(arguments, Boolean);
  },
  or() {
    return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
  },
  outRange: (lower, higher, value) => {
    return (lower && lower > value) || (higher && higher < value);
  },
});

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(flash());
app.use(
  session({
    // The secret used to sign session cookies (ADD ENV VAR)
    secret: process.env.SESSION_SECRET || "keyboard cat",
    name: "demo", // The cookie name (CHANGE THIS)
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: "strict",
      httpOnly: true,
      secure: app.get("env") === "production",
    },
  })
);
app.engine(
  "hbs",
  exphbs.engine({
    defaultlayout: "main",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index.hbs");
});

app.use((req, res, next) => {
  console.log("message arrived: " + req.method + " " + req.path);
  next();
});

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // Trust first proxy
}
// Initialise Passport.js
const passport = require("./passport");
app.use(passport.authenticate("session"));
// Load authentication router
const authRouter = require("./routes/auth");
app.use(authRouter);

const patientRouter = require("./routes/patientRouter");
const clinicianRouter = require("./routes/clinicianRouter");

app.use("/patient", patientRouter);
app.use("/clinician", clinicianRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Diabetes@Home is running");
});
