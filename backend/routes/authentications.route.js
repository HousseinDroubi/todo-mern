import { Router } from "express";
import {
  signUp,
  signIn,
  updateUsername,
  updatePassword,
} from "../controllers/authentication.controller.js";

import { checkToken } from "../middlewares/authentication.middleware.js";

const router = Router();

router.post("/sign_up", signUp);
router.post("/sign_in", signIn);
router.put("/update_username", checkToken, updateUsername);
router.put("/update_password", checkToken, updatePassword);

export default router;
