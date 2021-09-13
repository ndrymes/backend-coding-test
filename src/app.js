"use strict";
const authRoute = require("./routes");
const express = require("express");
const app = express();

const buildSchemas = require("./model/rides");

// setup Routing and Error Event Handling
authRoute.setup(app);

module.exports = (db) => {
  db.serialize(() => {
    // build schema
    buildSchemas(db);
  });
  return app;
};
