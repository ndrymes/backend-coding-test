const joi = require("joi");
require("dotenv").config();
// required environment variables
["NODE_ENV", "PORT"].forEach((name) => {
  if (!process.env[name])
    throw new Error(`Environment variable ${name} is missing`);
});
const envVarsSchema = joi
  .object({
    NODE_ENV: joi.string().required(),
    PORT: joi.any().required(),
  })
  .unknown()
  .required();

const { error, value: envVariables } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars = {
  env: envVariables.NODE_ENV,
  port: envVariables.PORT,
};

module.exports = envVars;
