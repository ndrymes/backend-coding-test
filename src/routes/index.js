const { ridesController } = require("../controllers/ride");
const bodyParser = require("body-parser");
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression');
const cookieParser = require("cookie-parser");

module.exports.setup = function setup(app) {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  //Accept all cors
  app.use(cors())
  //app security
  app.use(helmet());
  //compress resources for respone optimizatio
  app.use(compression())

  app.use(cookieParser());
  // parse application/json
  app.use(bodyParser.json());
  app.get("/", (req, res) => res.send({message:"Welcome"}));

  app.get("/health", (req, res) => res.send("Healthy"));

  // create rides
  app.post("/rides", (req, res) => ridesController.insertRides(req, res));

  // get rides
  app.get("/rides", (req, res) => ridesController.getAllRides(req, res));

  // get individual ride
  app.get("/rides/:id", (req, res) => ridesController.getRide(req, res));
};
