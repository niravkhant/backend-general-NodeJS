import { Router } from "express";
import { createBlog, getAllBlogs } from "../../controllers/blog/blog.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-blog").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  verifyJWT,
  createBlog
);
router.route("/get-all-blogs").get(getAllBlogs)

export default router;
