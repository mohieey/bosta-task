const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const schema = Joi.object({
  id: Joi.objectId(),
});

module.exports = function (req, res, next) {
  const result = schema.validate({ id: req.params.id });
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  next();
};
