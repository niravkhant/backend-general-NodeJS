import { Router } from "express";
import { createBlog, createCategory, deleteBlog, getAllBlogs } from "../../controllers/blog/blog.controller.js";
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
router.route("/create-blogcategory").post(upload.array(),verifyJWT,createCategory)
router.route("/delete-blog/:id").delete(verifyJWT,deleteBlog)

export default router;
