// user.route.js
import { Router } from "express";
import path from "path";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  getAllUsers,
  forgotPassword,
  resetForgottenPassword,
} from "../controllers/user.controller.js";
import { isAuthorized, verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdminMiddleware } from "../middlewares/isAdmin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
const __dirname = path.resolve();
router.use(upload.array());

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/get-all-users").get(getAllUsers);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:resetToken").post(resetForgottenPassword);
router
  .route("/reset-password/:resetToken")
  .get((req, res) => res.sendFile(path.join(__dirname, "/src/html/reset-password.html")));

export default router;
