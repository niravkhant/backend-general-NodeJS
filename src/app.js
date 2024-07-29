import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
// const upload = multer();

const whitelist = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
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
