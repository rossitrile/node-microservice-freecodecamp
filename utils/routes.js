module.exports = app => {
  app.use("/api/timestamp", require("../services/timestamp").route);
  app.use("/timestamp", require("../services/timestamp").view);
};
