import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const getDataFromToken = (token) => {
  try {
    const data = jwt.verify(token, process.env.PRIVATE_KEY);
    return data;
  } catch (error) {
    return null;
  }
};

const checkObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export { getDataFromToken, checkObjectId };
