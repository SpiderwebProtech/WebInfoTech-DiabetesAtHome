if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "userTest",
});

// Exit on error
const db = mongoose.connection.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

db.once("open", async () => {
  console.log(`Mongo connection started on ${db.host}:${db.port}`);
});

require("./userModel");
