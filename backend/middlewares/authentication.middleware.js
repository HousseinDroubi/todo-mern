import {
  checkObjectId,
  getDataFromToken,
} from "../functions/reusable_functions.js";

const checkToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const data = getDataFromToken(token);

  if (!data) {
    return res.json({
      result: "invalid_token",
    });
  }

  if (!data._id || !checkObjectId(data._id)) {
    return res.json({
      result: "invalid_id",
    });
  }

  req.data = data;

  next();
};

export { checkToken };
