import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "../../models/user.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { Blog } from "../../models/blog/blog.model.js";

const createBlog = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const {
    title,
    description,
    paragraph_HTML,
    special_quotes,
    categories,
    tags,
  } = req.body;
  console.log(req.files);
  const imageLocalPath = req.files?.image[0]?.path;

  if (!imageLocalPath) {
    throw new ApiError(400, "image file is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image) {
    throw new ApiError(400, "Image is required");
  }

  if (
    [title, description].some((item) => item?.trim() === "")
  ) {
    throw new ApiError(400, "starred fields are required");
  }

  const existedBlog = await Blog.findOne(title);

  if(existedBlog){
    throw new ApiError(401, "Blog already exists.")
  }

  const author = req.user._id;
  const blog = await Blog.create({
    title,
    description,
    image: image?.url || "",
    paragraph_HTML,
    special_quotes,
    tags,
    author: author,
  });

  const createdBlog = await Blog.findById(blog._id);

  if (!createdBlog) {
    throw new ApiError(500, "Something went wrong while creating the blog");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdBlog, "Blog created Successfully"));
});

const getAllBlogs = asyncHandler(async(req, res)=>{
  const allBlogs = await Blog.find()

  return res
    .status(200)
    .json(new ApiResponse(200, allBlogs, "All Blogs"));
})

export { createBlog, getAllBlogs };
