module.exports = app => {
  app.use("/api/timestamp", require("../services/Timestamp").route);
  app.use("/timestamp", require("../services/Timestamp").view);
  app.use("/api/whoami", require("../services/HeaderParser").route);
  app.use("/header-parser", require("../services/HeaderParser").view);
};
