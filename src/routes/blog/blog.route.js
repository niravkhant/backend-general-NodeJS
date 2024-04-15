import { Router } from "express";
import {
  createBlog,
  createCategory,
  deleteBlog,
  getAllBlogs,
  getCategory,
  blogDetail,
  updateBlog,
} from "../../controllers/blog/blog.controller.js";
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
router.route("/get-all-blogs").get(getAllBlogs);
router
  .route("/create-blogcategory")
  .post(upload.array(), verifyJWT, createCategory);
router.route("/get-blogcategory").get(verifyJWT, getCategory);
router.route("/delete-blog/:id").delete(verifyJWT, deleteBlog);
router.route("/blog-detail/:id").get(blogDetail);
router.route("/update-blog/:id").patch(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  verifyJWT,
  updateBlog
);

export default router;
