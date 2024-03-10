// user.route.js
import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  getAllUsers,
} from "../controllers/user.controller.js";
import { isAuthorized, verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdminMiddleware } from "../middlewares/isAdmin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(upload.array(), loginUser);

//secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router
  .route("/current-user")
  .get(verifyJWT, isAuthorized("editor"), getCurrentUser);
router.route("/get-all-users").get(getAllUsers)

export default router;
