//require services
const { ridesServices } = require("../../services/rides");
const Response = require("../../helpers/http-response");
const HTTPStatus = require("../../constants/http-status");
const logger = require("../../helpers/logger");
class RideController {
  async insertRides(req, res) {
    try {
      const startLatitude = Number(req.body.start_lat);
      const startLongitude = Number(req.body.start_long);
      const endLatitude = Number(req.body.end_lat);
      const endLongitude = Number(req.body.end_long);
      const riderName = req.body.rider_name;
      const driverName = req.body.driver_name;
      const driverVehicle = req.body.driver_vehicle;
      // create  a new ride details
      const result = await ridesServices.insertRides({
        start_lat: startLatitude,
        start_long: startLongitude,
        end_lat: endLatitude,
        end_long: endLongitude,
        rider_name: riderName,
        driver_name: driverName,
        driver_vehicle: driverVehicle,
      });
      res.send(result);
    } catch (error) {
      return this.handleInternalServerError(res, error);
    }
  }

  async getAllRides(req, res) {
    try {
      //check if there are no rides
      const result = await ridesServices.getAllRides();
      if (result.length === 0) {
        //proper error response
        return this.handleNoContent(res, [], {
          error_code: "RIDES_NOT_FOUND_ERROR",
          message: "Could not find any rides",
        });
      }
      res.send(result);
    } catch (error) {
      return this.handleInternalServerError(res, error);
    }
  }

  async getRide(req, res) {
    try {
      const rideId = req.params.id;
      //get ride details
      const result = await ridesServices.getRide({
        id: rideId,
      });
      res.send(result);
    } catch (error) {
      return error;
    }
  }
  handleOk(res, data) {
    logger.info("ride data gotten successfully");
    const response = new Response(
      HTTPStatus.OK,
      "Data gotten successfully",
      res,
      false,
      data
    );
    return response.res_message();
  }

  handleNoContent(res, data, err) {
    logger.info("There is no ride data ");
    const emptyResponse = new Response(
      HTTPStatus.NO_CONTENT,
      err,
      res,
      false,
      data
    );
    return emptyResponse.res_message();
  }

  handleInternalServerError(res, err) {
    logger.error("Error from getting ride data", err);
    const resp = new Response(
      HTTPStatus.INTERNAL_SERVER_ERROR,
      "Internal server error",
      res,
      true,
      []
    );
    return resp.res_message();
  }
}

module.exports = new RideController();
