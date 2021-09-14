"use strict";
const authRoute = require("./routes");
const express = require("express");

const app = express();
// setup Routing and Error Event Handling
authRoute.setup(app);

module.exports = app;
