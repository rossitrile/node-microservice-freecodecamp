require("./config/config");
const path = require("path");
const express = require("express");
const app = express();

// allow Joi to validate joi-objectid
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

require('./utils/mongoConnection');
require('./utils/middlewareConfig')(app);

// Setting views engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

require("./utils/routes")(app);

const server = app.listen(process.env.PORT || global.gConfig.node_port, () =>
  console.log(
    `Server is running in ${global.gConfig.config_id} mode at port ${
      global.gConfig.node_port
    }`
  )
);

module.exports = server;
