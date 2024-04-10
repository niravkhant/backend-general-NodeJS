import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "../../models/user.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { Blog } from "../../models/blog/blog.model.js";
import { BlogCategory } from "../../models/blog/blogCategory.model.js";

const createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;

  if (name.trim() === "") {
    throw new ApiError(401, "Category name should not be empty..!");
  }
  const existedCategory = await BlogCategory.findOne({ name });
  if (existedCategory) {
    throw new ApiError(401, "category already exists");
  }
  const author = req.user._id;
  const blogCategory = await BlogCategory.create({
    name,
    author: author,
  });
  const createdBlogCategory = await BlogCategory.findById(blogCategory._id);
  if (!createdBlogCategory) {
    throw new ApiError(
      500,
      "Something went wrong while creating the blog category"
    );
  }
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdBlogCategory,
        "Blog category created Successfully"
      )
    );
});

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, categories, status } = req.body;

  if ([title, description, status].some((item) => item?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedBlog = await Blog.findOne({ title });

  if (existedBlog) {
    throw new ApiError(401, "Blog already exists.");
  }

  const category = await BlogCategory.find({ name: categories });
  if (!category) {
    throw new ApiError(401, "Category does not exists");
  }
  const categoryID = category.map((item) => item._id);
  // console.log(req.files);
  const emptyFiles = req.files;
  console.log(emptyFiles);
  if (!emptyFiles) {
    throw new ApiError(400, "image file is required");
  }
  const imageLocalPath = req.files?.image[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "image file is required");
  }
  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(400, "Image is required");
  }

  const author = req.user._id;
  const blog = await Blog.create({
    title,
    description,
    image: image?.url || "",
    categories: categoryID,
    author: author,
    status: status,
  });

  const createdBlog = await Blog.findById(blog._id);

  if (!createdBlog) {
    throw new ApiError(500, "Something went wrong while creating the blog");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdBlog, "Blog created Successfully"));
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const allBlogs = await Blog.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $addFields: {
        author: {
          $first: "$author.fullname",
        },
      },
    },
    {
      $lookup: {
        from: "blogcategories",
        localField: "categories",
        foreignField: "_id",
        as: "categories",
      },
    },
    {
      $addFields: {
        categories: {
          $first: "$categories.name",
        },
      },
    },
  ]);

  if (!allBlogs?.length) {
    throw new ApiError(404, "Blogs does not exists");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allBlogs, "blogs fetched successfully"));
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;

  const blog = await Blog.findByIdAndDelete(blogId);
  if (!blog) {
    throw new ApiError(404, "Blog not Found");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, blog, "Blog deleted successfully"));
});
export { createCategory, createBlog, getAllBlogs, deleteBlog };
