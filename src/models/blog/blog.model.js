import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image:{
      type: String
    },
    description: {
      type: String,
      required: true,
    },
    // paragraph_HTML: {
    //   type: String,
    // },
    // special_quotes: {
    //   type: String,
    // },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "BlogCategory",
      },
    ],
    // tags: [
    //   {
    //     type: String,
    //   },
    // ],
    status:{
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
