const Joi = require("joi");

const Check = require("../models/check");

const checks = {};

const addCheck = (username, checkData) => {
  const newCheck = new Check(checkData);
  if (username in checks) checks[username][checkData.name] = checkData;
  else {
    checks[username] = {};
    checks[username][checkData.name] = checkData;
  }

  return newCheck;
};

const getCheck = (username, checkName) => {
  return users[username][checkName];
};

function validateCheck(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    url: Joi.string()
      .pattern(RegExp(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/))
      .messages({
        "string.pattern.base": `"Invalid url`,
      })
      .required(),
    protocol: Joi.string().valid("http", "https", "tcp").required(),
    path: Joi.string().optional(),
    port: Joi.number().optional(),
    webhook: Joi.string()
      .pattern(RegExp(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/))
      .messages({
        "string.pattern.base": `"Invalid url`,
      })
      .optional(),
    timeout: Joi.number().optional(),
    interval: Joi.number().optional(),
    threshold: Joi.number().optional(),
    authentication: Joi.string().optional(),
    httpHeaders: Joi.string().optional(),
    assert: Joi.string().optional(),
    tags: Joi.array().optional(),
    ignoreSSL: Joi.boolean().required(),
  });

  return schema.validate(check);
}

module.exports = { addCheck, getCheck, validateCheck };
