import Joi from "joi";

const validateSignUp = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(10).label("Username"),
    password: Joi.string().required().min(6).max(20).label("Password"),
  });

  return schema.validate(data);
};

const validateSignIn = (data) => {
  return validateSignUp(data);
};

const validateUpdateUsername = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(10).label("Username"),
  });

  return schema.validate(data);
};

const validateUpdatePassword = (data) => {
  const schema = Joi.object({
    old_password: Joi.string().required().min(6).max(20).label("Password"),
    new_password: Joi.string().required().min(6).max(20).label("Password"),
  });

  return schema.validate(data);
};

export {
  validateSignUp,
  validateSignIn,
  validateUpdateUsername,
  validateUpdatePassword,
};
