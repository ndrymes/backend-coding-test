"use strict";
// Attempt database connection

const app = require("./app");
const { envVars } = require("./config");
const Logger = require("./helpers/logger");

app.listen(envVars.port, () => {
  Logger.info(`Service is running on ${envVars.port}`);
});
