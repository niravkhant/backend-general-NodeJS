import { Router } from "express";
import { upload } from "../../middlewares/multer.middleware.js";
import { uploadGeneral } from "../../controllers/other/upload.controller.js";

const router = Router();

router.route("/upload-general").post(upload.single("file"), uploadGeneral);

export default router;
