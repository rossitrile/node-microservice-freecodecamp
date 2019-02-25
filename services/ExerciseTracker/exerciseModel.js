const mongoose = require("mongoose");
const Joi = require("joi");

const exerciseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 10
  },
  date: Date
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  exercises: [exerciseSchema]
});

const User = mongoose.model("User", userSchema);

const userValidator = user => {
  const schema = {
    username: Joi.string()
      .required()
      .error(() => "username cannot be empty")
  };
  return Joi.validate(user, schema);
};
const exerciseValidator = exercise => {
  const schema = {
      userId: Joi.objectId().required().error(() => 'userId has to be a mongodb id object and cannot be empty'),
    description: Joi.string()
      .required()
      .error(() => "description cannot be empty."),
    duration: Joi.number()
      .min(10)
      .required()
      .error(
        () => "Duration has to be a number greater than 10 and cannot be empty."
      ),
    date: Joi.date()
      .iso()
      .allow('')
      .optional()
      .error(() => "date has to be in the YYYY-MM-DD format")
  };
  return Joi.validate(exercise, schema);
};

module.exports = { Exercise, User, userValidator, exerciseValidator };
