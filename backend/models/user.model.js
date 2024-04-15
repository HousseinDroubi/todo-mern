import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const user_schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

user_schema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.PRIVATE_KEY,
    {
      expiresIn: "7d",
    }
  );

  return token;
};

const User = mongoose.model("users", user_schema);
export default User;
