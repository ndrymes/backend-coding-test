/* eslint-disable no-useless-catch */
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
      throw error;
    }
  }

  /**
   * fetch all rideds
   * @param {String} request
   * @returns {Object} response [rides]
   */
  async getAllRides({ skip, limit }) {
    try {
      const value = await ridesValidator.getAllRides({skip, limit});
      return ridesRepository.getAllRides(value);
    } catch (error) {
      throw error;
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
      throw error;
    }
  }
}

module.exports = new RideServices();
