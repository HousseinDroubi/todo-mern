import Joi from "joi";

const validateAddTodo = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().min(5).max(100).label("Title"),
  });

  return schema.validate(data);
};

const validateUpdateTodo = (data) => {
  return validateAddTodo(data);
};

export { validateAddTodo, validateUpdateTodo };
