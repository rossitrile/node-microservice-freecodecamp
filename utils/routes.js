module.exports = app => {
  app.use("/api/timestamp", require("../services/timestamp").route);
  app.use("/timestamp", require("../services/timestamp").view);
  app.use("/api/whoami", require("../services/HeaderParser").route);
  app.use("/header-parser", require("../services/HeaderParser").view);
  app.use("/api/shorturl", require("../services/URLShortener").route);
  app.use("/url-shortener", require("../services/URLShortener").view);
  app.use("/api/metadata", require("../services/Metadata").route);
  app.use("/metadata", require("../services/Metadata").view);
  app.use("/api/exercise", require("../services/ExerciseTracker").route);
  app.use("/exercise-tracker", require("../services/ExerciseTracker").view);
};
