import  {Schema, model} from "mongoose";

const blogCategorySchema = new Schema({
    name:{
        type: String,
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
    }
}, {timestamps: true});

export const BlogCategory = model("BlogCategory", blogCategorySchema);