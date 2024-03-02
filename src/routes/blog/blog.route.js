import { Router } from "express";
import { createBlog } from "../../controllers/blog/blog.controller.js";

const router = Router();

router.route("/createblog").post(createBlog);

export default router;
