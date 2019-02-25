const router = require("express").Router();
const _ = require("lodash");
const mongoose = require("mongoose");
const moment = require("moment");

const { User, userValidator, exerciseValidator } = require("./exerciseModel");
const validation = require("../../middleware/validation");
router.post("/new-user", validation(userValidator), async (req, res) => {
  const username = req.body.username;
  const user = await User.findOne({username})
  if (user) return res.status(400).send({error: 'username has been taken.'})
  const newUser = new User({ username });
  await newUser.save();
  res.send(_.pick(newUser, ["_id", "username"]));
});
router.post("/add", validation(exerciseValidator), async (req, res) => {
  const { userId, description, duration, date: dateInput } = req.body;
  const user = await User.findOne({ _id: userId });
  if (!user) return res.status(400).send({ error: "user not found." });

  const date = dateInput || new Date();
  user["exercises"].push({
    description,
    duration,
    date: new Date(date).toUTCString()
  });
  await user.save();
  res.send({
    userId: user["_id"],
    username: user["username"],
    description,
    duration,
    date: new Date(date).toUTCString()
  });
});
router.get("/log", async (req, res) => {
  const { userId, from, to, limit } = req.query;
  const validUserId = userId && mongoose.Types.ObjectId.isValid(userId);
  if (!validUserId)
    return res.status(400).send({
      error: "userId has to be a mongodb id object and cannot be empty"
    });
  const user = await User.findOne({ _id: userId });
  if (!user) return res.status(400).send({ error: "user not found." });

  const { exercises } = user;
  const momentFrom = moment(from || "1970-01-01");
  const momentTo = moment(to || "2080-01-16");
  let filteredExercises = exercises.filter(
    ({ date }) =>
      moment(date).isSameOrAfter(momentFrom) && moment(date).isSameOrBefore(momentTo)
  );
  res.send({
    exercises: limit ? filteredExercises.slice(filteredExercises.length - limit) : filteredExercises,
    username: user.username,
    userId: user._id
  });
});

module.exports = router;
