const mongoose = require("mongoose");
const Joi = require("joi");

const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    minlength: 5,
    maxlength: 300,
    required: true
  },
  shortened_url: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
  }
});

const Url = mongoose.model("Url", urlSchema);

const urlValidator = url => {
  const schema = {
    original_url: Joi.string()
      .min(5)
      .max(100)
      .required()
  };

  return Joi.validate(url, schema);
};

module.exports = {
  Url,
  urlValidator
};
