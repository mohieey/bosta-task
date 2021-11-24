const Joi = require("joi");

module.exports = function (user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(25).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
};
