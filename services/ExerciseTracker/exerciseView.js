const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("exercise", {
    project: "Exercise Tracker",
    endpoint: `https://${global.gConfig.hostName}/api`
  });
});

module.exports = router;
