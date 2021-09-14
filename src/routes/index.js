const { ridesController } = require("../controllers/ride");
const bodyParser = require("body-parser");

module.exports.setup = function setup(app) {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  app.get("/health", (req, res) => res.send("Healthy"));

  // create rides
  app.post("/rides", (req, res) => ridesController.insertRides(req, res));

  // get rides
  app.get("/rides", (req, res) => ridesController.getAllRides(req, res));

  // get individual ride
  app.get("/rides/:id", (req, res) => ridesController.getRide(req, res));
};
