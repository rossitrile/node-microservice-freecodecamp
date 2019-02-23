const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("headerParser", {
    project: "Request Header Parser Microservice",
    endpoint: `GET https://${
      global.gConfig.hostName
    }/api/whoami`
  });
});

module.exports = router;
