"use strict";
// Attempt database connection
const { database: db } = require("./config");
const app = require("./app")(db);
const { envVars } = require("./config");
const Logger = require("./helpers/logger");

app.listen(envVars.port, () => {
  Logger.info(`Service is running on ${envVars.port}`);
});
