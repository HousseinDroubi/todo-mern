import {
  validateSignIn,
  validateSignUp,
  validateUpdatePassword,
  validateUpdateUsername,
} from "../validations/authentications.validation.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";

const signUp = async (req, res) => {
  const { error } = validateSignUp(req.body);
  if (error) {
    return res.json({
      error_message: error.details[0].message,
    });
  }

  const user = await User.exists({
    username: req.body.username,
  });

  if (user) {
    return res.json({
      result: "username_is_taken",
    });
  }

  // Hashning password
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashed_password = await bcrypt.hash(req.body.password, salt);

  await User.create({
    username: req.body.username,
    password: hashed_password,
  });

  return res.json({
    result: "user_has_been_created_successfully",
  });
};

const signIn = async (req, res) => {
  const { error } = validateSignIn(req.body);
  if (error) {
    return res.json({
      error_message: error.details[0].message,
    });
  }

  const user = await User.findOne().where("username").equals(req.body.username);

  if (!user) {
    return res.json({
      result: "username_or_password_are_wrong",
    });
  }

  const bcrypt_compare = await bcrypt.compare(req.body.password, user.password);

  if (!bcrypt_compare) {
    return res.json({
      result: "username_or_password_are_wrong",
    });
  }

  const token = user.generateToken();

  return res.json({
    result: "done",
    token,
  });
};

const updateUsername = async (req, res) => {
  const data = req.data;

  const { error } = validateUpdateUsername(req.body);
  if (error) {
    return res.json({
      error_message: error.details[0].message,
    });
  }

  const is_existed = await User.findOne()
    .where("username")
    .equals(req.body.username);

  if (is_existed) {
    return res.json({
      result: "username_is_taken",
    });
  }
  const user = await User.findById(data._id);

  user.username = req.body.username;

  await user.save();

  return res.json({
    result: "username_updated",
  });
};

const updatePassword = async (req, res) => {
  const data = req.data;
  const { error } = validateUpdatePassword(req.body);
  if (error) {
    return res.json({
      error_message: error.details[0].message,
    });
  }

  const user = await User.findById(data._id);

  const is_same = await bcrypt.compare(req.body.old_password, user.password);

  if (!is_same) {
    return res.json({
      result: "old_password_is_wrong",
    });
  }

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashed_password = await bcrypt.hash(req.body.new_password, salt);

  user.password = hashed_password;

  await user.save();

  return res.json({
    result: "password_changed",
  });
};

export { signUp, signIn, updateUsername, updatePassword };
