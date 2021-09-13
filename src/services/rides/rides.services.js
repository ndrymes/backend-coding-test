//require services
const { ridesRepository } = require("../../repositories/rides");
const ridesValidator = require("./rides.validators");

class RideServices {
  /**
   * create rides
   * @param {String} request
   * @returns {Object} response rides
   */
  async insertRides(requestContext) {
    try {
      const value = await ridesValidator.createride(requestContext);
      return ridesRepository.insertRides(value);
    } catch (error) {
      if (error.name === "ValidationError") {
        return {
          error_code: "VALIDATION_ERROR",
          message: error.message,
        };
      }
      return error.message;
    }
  }

  /**
   * fetch all rideds
   * @param {String} request
   * @returns {Object} response [rides]
   */
  async getAllRides() {
    try {
      return ridesRepository.getAllRides();
    } catch (error) {
      return error.message;
    }
  }

  /**
   * fetch  ride
   * @param {String} request
   * @returns {Object} response ride
   */
  async getRide(requestContext) {
    try {
      const value = await ridesValidator.getRide(requestContext);
      return ridesRepository.getRide(value);
    } catch (error) {
      if (error.name === "ValidationError") {
        return {
          error_code: "VALIDATION_ERROR",
          message: error.message,
        };
      }
      return error.message;
    }
  }
}

module.exports = new RideServices();
