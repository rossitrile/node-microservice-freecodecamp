// Used this if you don't use a frontend framework.

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("timestamp", {
    project: "Time Stamp Microservice",
    endpoint: `GET http://${global.gConfig.url}/timestamp/:date_string`
  });
});
module.exports = router;
