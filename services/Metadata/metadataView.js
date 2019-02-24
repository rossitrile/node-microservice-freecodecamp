const route = require("express").Router();

route.get("/", (req, res) => {
  res.render("metadata", {
    project: "File Metadata Microservice",
    endpoint: `POST https://${global.gConfig.hostName}/api/metadata`
  });
});

module.exports = route;
