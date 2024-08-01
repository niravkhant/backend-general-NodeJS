import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
// const upload = multer();

const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];

console.log(allowedOrigins)

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: "GET,POST,HEAD,PATCH,PUT,DELETE",
  })
);

app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: true, limit: "200kb" }));
// app.use(upload.array());
app.use(express.static("public"));
app.use(cookieParser());

/*****************
 * ROUTES IMPORT *
 *****************/

import userRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog/blog.route.js";
import otherRouter from "./routes/other/upload.route.js";

/**********************
 * ROUTES DECLARATION *
 **********************/
app.get("/",(req, res)=>{
  res.send(`<h1> Server is Running...💻</h1>`)
})
app.use("/api/v1/users", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1", otherRouter);

/*******************************
 * Global ApiError as response *
 *******************************/
app.use(errorHandler);

export default app;
