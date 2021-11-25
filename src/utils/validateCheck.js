const Joi = require("joi");

module.exports = function (check) {
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
        "string.empty": `port cannot be an empty field, if you don't want to provide one, please remove it from the body`,
      })
      .optional(),
    webhook: Joi.string()
      .pattern(RegExp(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/))
      .messages({
        "string.empty": `webhook cannot be an empty field, if you don't want to provide one, please remove it from the body`,
      })
      .optional(),
    pushover: Joi.object().optional(),
    timeout: Joi.number()
      .min(1000)
      .integer()
      .messages({
        "number.base": `timeout cannot be an empty field, if you don't want to provide one, please remove it from the body`,
      })
      .optional(),
    interval: Joi.number()
      .min(20000)
      .integer()
      .messages({
        "number.base": `interval cannot be an empty field, if you don't want to provide one, please remove it from the body`,
      })
      .optional(),
    threshold: Joi.number()
      .min(1)
      .integer()
      .messages({
        "number.base": `threshold cannot be an empty field, if you don't want to provide one, please remove it from the body`,
      })
      .optional(),
    authentication: Joi.object().optional(),
    httpHeaders: Joi.object().optional(),
    assert: Joi.object({
      statusCode: Joi.number()
        .messages({
          "any.required": `"statusCode propert is required, if you don't want to provide any assertions, please remove it the assert property from the body`,
        })
        .required(),
    }).optional(),
    tags: Joi.array().optional(),
    ignoreSSL: Joi.boolean().required(),
  });

  return schema.validate(check);
};
