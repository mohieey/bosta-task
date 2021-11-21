const Joi = require("joi");

const Check = require("../models/check");

const checks = {};

const addCheck = (username, checkData) => {
  const newCheck = new Check(checkData);
  if (username in checks) {
    if (checks[username][newCheck.name]) return undefined;

    checks[username][newCheck.name] = newCheck;
  } else {
    checks[username] = {};
    checks[username][newCheck.name] = newCheck;
  }

  return newCheck;
};

const getCheck = (username, checkName) => {
  //   return checks[username][checkName];
  return checks;
};

function validateCheck(check) {
  const schema = Joi.object({
    name: Joi.string().required(),
    url: Joi.string()
      .pattern(RegExp(/[^\s$.?#].[^\s]*$/))
      .messages({
        "string.pattern.base": `"Invalid url`,
      })
      .required(),
    protocol: Joi.string().valid("http", "https", "tcp").required(),
    path: Joi.string()
      .pattern(RegExp(/^\/[^\s]/))
      .messages({
        "string.pattern.base": `"Invalid path, try /yourPath`,
        "string.empty": `path cannot be an empty field, if you don't want to provide one, please remove from the body`,
      })
      .optional(),
    port: Joi.string()
      .pattern(RegExp(/^:[^\s]/))
      .messages({
        "string.pattern.base": `"Invalid port, try :yourPort`,
        "string.empty": `port cannot be an empty field, if you don't want to provide one, please remove from the body`,
      })
      .optional(),
    webhook: Joi.string()
      .pattern(RegExp(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/))
      .messages({
        "string.pattern.base": `"Invalid url`,
      })
      .optional(),
    timeout: Joi.number().optional(),
    interval: Joi.number().optional(),
    threshold: Joi.number().optional(),
    authentication: Joi.object().optional(),
    httpHeaders: Joi.object().optional(),
    assert: Joi.object({
      statusCode: Joi.number()
        .messages({
          "any.required": `"statusCode propert is required, if you don't want to provide any assertions, please remove the assert property from the body`,
        })
        .required(),
    }).optional(),
    tags: Joi.array().optional(),
    ignoreSSL: Joi.boolean().required(),
  });

  return schema.validate(check);
}

module.exports = { addCheck, getCheck, validateCheck };
