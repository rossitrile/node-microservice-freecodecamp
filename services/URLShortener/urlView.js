const route = require("express").Router();

route.get("/", (req, res) => {
  res.render("url", {
    project: "URL Shortener Microservice",
    endpoint: `POST https://${
      global.gConfig.hostName
    }/api/shorturl`
  });
});

module.exports = route;
