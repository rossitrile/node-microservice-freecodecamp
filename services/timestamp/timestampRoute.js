const router = require("express").Router();
const moment = require("moment");

const formatTime = time =>
  typeof time.getMonth === "function"
    ? { unix: time.getTime(), utc: time.toUTCString() }
    : "Argument time need to be the date object";

router.get("/:dateString", (req, res) => {
  const time_string = req.params.dateString;
  const dateValid = moment(time_string, "YYYY-MM-DD", true).isValid();
  if (dateValid) return res.send(formatTime(new Date(time_string)));

  const unixValid = /^\d+$/.test(time_string);
  if (unixValid) return res.send(formatTime(new Date(time_string * 1000)));

  res.status(400).send({ error: "Invalid Date" });
});

router.get("/", (req, res) => {
  res.send(formatTime(new Date()));
});

module.exports = router;
