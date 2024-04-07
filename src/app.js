import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
// const upload = multer();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
// app.use(upload.array());
app.use(express.static("public"));
app.use(cookieParser());


/*****************
 * ROUTES IMPORT *
 *****************/

import userRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog/blog.route.js";

/**********************
 * ROUTES DECLARATION *
 **********************/

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blog", blogRouter);

/*******************************
 * Global ApiError as response *
 *******************************/
app.use(errorHandler);

export default app;
