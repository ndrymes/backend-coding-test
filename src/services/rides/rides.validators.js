/* eslint-disable no-useless-catch */
const Joi = require("joi");

class RidesValidator {
  constructor() {
    this.Joi = Joi;
  }

  createride(data) {
    const { Joi } = this;
    const schema = {
      start_lat: Joi.number().required().max(90).min(-90),
      start_long: Joi.number().required().max(180).min(-180),
      end_lat: Joi.number().required().max(90).min(-90),
      end_long: Joi.number().required().max(180).min(-180),
      rider_name: Joi.string().required(),
      driver_name: Joi.string().required(),
      driver_vehicle: Joi.string().required(),
    };
    return Joi.object(schema).validateAsync(data);
  }
  getRide(data) {
    const { Joi } = this;
    const schema = {
      id: Joi.string().required(),
    };
    return Joi.object(schema).validateAsync(data);
  }
  getAllRides(data) {
    const { Joi } = this;
    const schema = {
      skip: Joi.number(),
      limit:Joi.number()
    };
    return Joi.object(schema).validateAsync(data);
  }
}
const ridesValidator = new RidesValidator();
module.exports = ridesValidator;
