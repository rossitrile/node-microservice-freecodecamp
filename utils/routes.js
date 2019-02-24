module.exports = app => {
  app.use("/api/timestamp", require("../services/Timestamp").route);
  app.use("/timestamp", require("../services/Timestamp").view);
  app.use("/api/whoami", require("../services/HeaderParser").route);
  app.use("/header-parser", require("../services/HeaderParser").view);
  app.use("/api/shorturl", require("../services/URLShortener").route);
  app.use("/url-shortener", require("../services/URLShortener").view);
  app.use("/api/metadata", require("../services/Metadata").route);
  app.use("/metadata", require("../services/Metadata").view);
};
