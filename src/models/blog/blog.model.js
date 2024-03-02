import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    paragraph_HTML: {
      type: String,
    },
    special_quotes: {
      type: String,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "BlogCategory",
        required: true
      },
    ],
    tags: [
      {
        type: String,
        required: true
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
